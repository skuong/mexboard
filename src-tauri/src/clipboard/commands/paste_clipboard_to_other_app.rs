use crate::{
    clipboard::write_clipboard_item_to_system_clipboard::write_clipboard_item_to_system_clipboard,
    utils::simulate_ctrl_v::simulate_ctrl_v,
};
use tauri::{AppHandle, Manager};

#[tauri::command]
#[specta::specta]
pub async fn paste_clipboard_to_other_app(id: u32, app_handle: AppHandle) -> Result<(), String> {
    if let Err(_) = write_clipboard_item_to_system_clipboard(id, app_handle.clone()).await {
        log::error!("Can't write to clipboard");
    }

    if let Some(window) = app_handle.get_webview_window("main") {
        let _ = window.hide();
    }

    simulate_ctrl_v().await
}
