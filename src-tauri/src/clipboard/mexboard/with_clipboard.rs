use crate::clipboard::mexboard::MexBoard;
use std::time::Duration;

pub async fn with_clipboard<F, T>(
    mexboard: &MexBoard,
    mut operation: F,
) -> Result<T, arboard::Error>
where
    F: FnMut(&mut arboard::Clipboard) -> Result<T, arboard::Error>,
{
    const MAX_RETRIES: u32 = 3;
    const INITIAL_DELAY_MS: u64 = 50;

    for attempt in 0..MAX_RETRIES {
        if attempt > 0 {
            let delay_ms = INITIAL_DELAY_MS * (1 << (attempt - 1));
            tokio::time::sleep(Duration::from_millis(delay_ms)).await;
        }

        if let Err(err) = mexboard.is_clipboard_instance_exists() {
            if attempt < MAX_RETRIES - 1 {
                continue;
            } else {
                return Err(arboard::Error::Unknown {
                    description: format!("No clipboard instance: {}", err),
                });
            }
        }

        let result = {
            let mut clipboard_mutex_guard = match mexboard.clipboard.lock() {
                Ok(guard) => guard,
                Err(err) => {
                    if attempt < MAX_RETRIES - 1 {
                        continue;
                    } else {
                        return Err(arboard::Error::Unknown {
                            description: format!("Failed to acquire clipboard lock: {}", err),
                        });
                    }
                }
            };

            match clipboard_mutex_guard.as_mut() {
                Some(clipboard) => operation(clipboard),
                None => {
                    if attempt < MAX_RETRIES - 1 {
                        continue;
                    } else {
                        return Err(arboard::Error::Unknown {
                            description: "No clipboard instance".to_string(),
                        });
                    }
                }
            }
        };

        match result {
            Ok(value) => return Ok(value),
            Err(arboard::Error::ContentNotAvailable) => {
                return Err(arboard::Error::ContentNotAvailable);
            }
            Err(err) => {
                if attempt < MAX_RETRIES - 1 {
                    // Invalidate the clipboard instance on error to force re-creation on next attempt
                    if let Ok(mut guard) = mexboard.clipboard.lock() {
                        *guard = None;
                    }
                    continue;
                } else {
                    return Err(err);
                }
            }
        }
    }

    Err(arboard::Error::Unknown {
        description: "Unexpected error: max retries exceeded".to_string(),
    })
}
