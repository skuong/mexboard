use crate::clipboard::mexboard::MexBoard;
use std::time::Duration;

pub async fn read_text(mexboard: &MexBoard) -> Result<String, String> {
    const MAX_RETRIES: u32 = 3;
    const INITIAL_DELAY_MS: u64 = 50;

    for attempt in 0..MAX_RETRIES {
        if attempt > 0 {
            let delay_ms = INITIAL_DELAY_MS * (1 << (attempt - 1));
            tokio::time::sleep(Duration::from_millis(delay_ms)).await;
        }

        if let Err(e) = mexboard.is_clipboard_instance_exists() {
            if attempt < MAX_RETRIES - 1 {
                continue;
            } else {
                return Err(format!("Failed to create clipboard: {}", e));
            }
        }

        let result = {
            let mut clipboard_guard = mexboard
                .clipboard
                .lock()
                .map_err(|e| format!("Failed to acquire clipboard lock: {}", e))?;

            match clipboard_guard.as_mut() {
                Some(clipboard) => clipboard.get_text(),
                None => {
                    return Err("Clipboard instance is None".to_string());
                }
            }
        };

        match result {
            Ok(text) => return Ok(text),
            Err(e) => {
                let error_str = e.to_string();

                if error_str.contains("empty") || error_str.contains("not available") {
                    return Ok(String::new());
                }

                if attempt < MAX_RETRIES - 1 {
                    // Invalidate clipboard on error
                    if let Ok(mut guard) = mexboard.clipboard.lock() {
                        *guard = None;
                    }
                    continue;
                } else {
                    return Err(format!("Failed to read clipboard: {}", error_str));
                }
            }
        }
    }

    Err("Unexpected error in read".to_string())
}
