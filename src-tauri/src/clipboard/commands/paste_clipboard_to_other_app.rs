use crate::{
    clipboard::write_clipboard_item_to_system_clipboard::write_clipboard_item_to_system_clipboard,
    utils::simulate_ctrl_v::simulate_ctrl_v,
};
use std::time::Duration;
use tauri::{AppHandle, Manager};
use tokio::time::sleep;

#[tauri::command]
#[specta::specta]
pub async fn paste_clipboard_to_other_app(id: u32, app_handle: AppHandle) -> Result<(), String> {
    if let Some(window) = app_handle.get_webview_window("main") {
        let _ = window.hide();
    }

    if let Err(_) = write_clipboard_item_to_system_clipboard(id, app_handle).await {
        log::error!("Can't write to clipboard");
    }

    sleep(Duration::from_millis(100)).await;

    simulate_ctrl_v()
}
