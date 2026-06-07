use tauri::{AppHandle, Manager};

#[tauri::command]
#[specta::specta]
pub async fn open_draw_window(app: AppHandle) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("draw") {
        let _ = window.set_focus();
        let _ = window.set_always_on_top(false);
        Ok(())
    } else {
        tauri::WebviewWindowBuilder::new(
            &app,
            "draw",
            tauri::WebviewUrl::App("index.html#/draw".into()),
        )
        .title("Drawing Board")
        .inner_size(800.0, 600.0)
        .decorations(true)
        .build()
        .map_err(|e| e.to_string())?;
        Ok(())
    }
}
