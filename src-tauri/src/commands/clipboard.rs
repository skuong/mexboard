use crate::clipboard::monitoring::MonitorState;
use crate::clipboard::ClipboardManager;
use crate::utils::simulate_ctrl_v::simulate_ctrl_v;
use tauri::{AppHandle, Manager, State};

#[tauri::command]
#[specta::specta]
pub async fn read_clipboard(manager: State<'_, ClipboardManager>) -> Result<String, String> {
    manager.read_text().await
}

#[tauri::command]
#[specta::specta]
pub async fn read_clipboard_image(
    manager: State<'_, ClipboardManager>,
) -> Result<Option<(Vec<u8>, u32, u32)>, String> {
    manager.read_image().await
}

#[tauri::command]
#[specta::specta]
pub async fn write_clipboard(
    text: String,
    manager: State<'_, ClipboardManager>,
) -> Result<(), String> {
    manager.write_text(text).await
}

#[tauri::command]
#[specta::specta]
pub async fn paste_emoji_to_other_app(
    emoji: String,
    manager: State<'_, ClipboardManager>,
    app_handle: AppHandle,
) -> Result<(), String> {
    let _ = manager.write_text(emoji).await;

    if let Some(window) = app_handle.get_webview_window("main") {
        let _ = window.hide();
    }

    simulate_ctrl_v().await
}

#[tauri::command]
#[specta::specta]
pub async fn reinitialize_clipboard(manager: State<'_, ClipboardManager>) -> Result<(), String> {
    manager.reinitialize()
}

#[tauri::command]
#[specta::specta]
pub fn set_monitoring(enabled: bool, state: State<'_, MonitorState>) {
    state
        .is_monitoring
        .store(enabled, std::sync::atomic::Ordering::Relaxed);
}
