use std::sync::atomic::{AtomicBool, Ordering};
use tauri::{AppHandle, Manager};
use tokio::time::{interval, Duration};

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

pub fn start(app: &AppHandle) {
    let handle = app.clone();

    tauri::async_runtime::spawn(async move {
        let monitor_state = handle.state::<MonitorState>();
        let mut ticker = interval(Duration::from_millis(500));

        loop {
            ticker.tick().await;

            if !monitor_state.is_monitoring.load(Ordering::Relaxed) {
                continue;
            }
        }
    });
}
