use crate::websocket::{send_message_via_websocket, WebSocketState};
use crate::{
    clipboard::{compare_and_insert_image_if_not_exists, compare_and_insert_text_if_not_exists},
    database::Database,
};
use std::sync::atomic::{AtomicBool, Ordering};
use tauri::{AppHandle, Manager};
use tokio::time::{interval, Duration};

use crate::clipboard::manager;

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
        let mut ticker = interval(Duration::from_millis(500));

        loop {
            let monitor_state = app.state::<MonitorState>();
            if !monitor_state.is_monitoring.load(Ordering::Relaxed) {
                continue;
            }
            ticker.tick().await;

            let db = app.state::<Database>();
            let socket = app.state::<WebSocketState>();

            let clipboard_text = app.state::<manager::ClipboardManager>().read_text().await;

            match clipboard_text {
                Ok(text) => {
                    if !text.is_empty() {
                        let insert_text_result =
                            compare_and_insert_text_if_not_exists(text.clone(), &db);

                        if let Ok(_) = insert_text_result {
                            let _result = send_message_via_websocket(socket, text).await;
                        }
                    }
                }
                Err(_) => {
                    let clipboard_image =
                        app.state::<manager::ClipboardManager>().read_image().await;

                    match clipboard_image {
                        Ok(image) => {
                            if let Some(image) = image {
                                let _result = compare_and_insert_image_if_not_exists(image, &db);
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
