use std::sync::atomic::{AtomicBool, Ordering};
use tauri::{AppHandle, Manager};
use tokio::time::{interval, Duration};

use crate::{clipboard::manager, crypto};

pub struct MonitorState {
    pub is_monitoring: AtomicBool,
}

impl MonitorState {
    pub fn new() -> Self {
        Self {
            is_monitoring: AtomicBool::new(true),
        }
    }
}

pub fn start(app_handle: &AppHandle) {
    let app = app_handle.clone();

    tauri::async_runtime::spawn(async move {
        let monitor_state = app.state::<MonitorState>();
        let mut ticker = interval(Duration::from_millis(500));

        loop {
            if !monitor_state.is_monitoring.load(Ordering::Relaxed) {
                continue;
            }
            ticker.tick().await;

            let clipboard_text = app.state::<manager::ClipboardManager>().read_text().await;

            match clipboard_text {
                Ok(text) => {
                    if !text.is_empty() {
                        let hash = crypto::hash_bytes::hash(text.as_bytes());
                        log::info!("Text hash: {:?}", hash);
                    }
                }
                Err(err) => {
                    log::error!("Failed to read clipboard as text: {}", err);

                    let clipboard_image =
                        app.state::<manager::ClipboardManager>().read_image().await;

                    match clipboard_image {
                        Ok(image) => {
                            if let Some(image) = image {
                                let hash = crypto::hash_bytes::hash(&image.0);
                                log::info!("Image hash: {:?}", hash);
                            }
                        }
                        Err(err) => {
                            log::error!("Failed to read clipboard as image: {}", err);
                        }
                    }
                }
            }
        }
    });
}
