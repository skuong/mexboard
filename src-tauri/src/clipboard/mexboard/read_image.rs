use crate::clipboard::mexboard::MexBoard;
use std::time::Duration;

pub async fn read_image(mexboard: &MexBoard) -> Result<Option<(Vec<u8>, u32, u32)>, String> {
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
                Some(clipboard) => clipboard.get_image(),
                None => {
                    return Err("Clipboard instance is None".to_string());
                }
            }
        };

        match result {
            Ok(image_data) => {
                let width = image_data.width as u32;
                let height = image_data.height as u32;
                let rgba_bytes = image_data.bytes.into_owned();
                return Ok(Some((rgba_bytes, width, height)));
            }
            Err(e) => {
                let error_str = e.to_string();

                // No image in clipboard is not an error
                if error_str.contains("empty")
                    || error_str.contains("not available")
                    || error_str.contains("ContentNotAvailable")
                {
                    return Ok(None);
                }

                if attempt < MAX_RETRIES - 1 {
                    if let Ok(mut guard) = mexboard.clipboard.lock() {
                        *guard = None;
                    }
                    continue;
                } else {
                    return Err(format!("Failed to read image: {}", error_str));
                }
            }
        }
    }

    Err("Unexpected error in read_image".to_string())
}
