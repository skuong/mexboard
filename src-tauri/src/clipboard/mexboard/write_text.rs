use crate::clipboard::mexboard::MexBoard;
use std::time::Duration;

pub async fn write_text(mexboard: &MexBoard, text: String) -> Result<(), String> {
    const MAX_RETRIES: u32 = 3;
    const INITIAL_DELAY_MS: u64 = 50;

    for attempt in 0..MAX_RETRIES {
        if let Err(e) = mexboard.is_clipboard_instance_exists() {
            if attempt < MAX_RETRIES - 1 {
                let delay_ms = INITIAL_DELAY_MS * (1 << attempt);
                tokio::time::sleep(Duration::from_millis(delay_ms)).await;
                continue;
            } else {
                return Err(format!("Failed to ensure clipboard: {}", e));
            }
        }

        let result = {
            let mut clipboard_guard = mexboard
                .clipboard
                .lock()
                .map_err(|e| format!("Failed to acquire clipboard lock: {}", e))?;

            match clipboard_guard.as_mut() {
                Some(clipboard) => clipboard.set_text(text.clone()),
                None => {
                    return Err("Clipboard instance is None".to_string());
                }
            }
        };

        match result {
            Ok(_) => return Ok(()),
            Err(e) => {
                if attempt < MAX_RETRIES - 1 {
                    // Invalidate the clipboard instance
                    if let Ok(mut guard) = mexboard.clipboard.lock() {
                        *guard = None;
                    }
                    let delay_ms = INITIAL_DELAY_MS * (1 << attempt);
                    tokio::time::sleep(Duration::from_millis(delay_ms)).await;
                    continue;
                } else {
                    return Err(format!("Failed to write clipboard: {}", e));
                }
            }
        }
    }

    Err("Unexpected error in write".to_string())
}
