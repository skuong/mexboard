use tauri::{AppHandle, Manager};

use crate::{clipboard::ClipboardManager, database::Database};

#[tauri::command]
#[specta::specta]
pub async fn write_clipboard_item_to_system_clipboard(
    id: u32,
    app_handle: AppHandle,
) -> Result<(), String> {
    let db = app_handle.state::<Database>();
    let clipboard_result = db.get_clipboard_by_id(id);

    match clipboard_result {
        Ok(clipboard) => {
            let mexboard = app_handle.state::<ClipboardManager>();

            if let Some(content) = clipboard.content {
                let _ = mexboard.write_text(content).await;
            } else if let Some(image) = clipboard.image {
                let width = clipboard.width.unwrap();
                let height = clipboard.width.unwrap();
                log::info!("width: {}", width);
                log::info!("height: {}", height);
                let _ = mexboard.write_image(image, width, height).await;
            }
        }
        Err(_) => {
            log::error!("No clipboard in database!");
        }
    }

    Ok(())
}
