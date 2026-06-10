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
            } else if let Some(image_in_webp) = clipboard.image {
                match image::load_from_memory_with_format(&image_in_webp, image::ImageFormat::WebP)
                {
                    Ok(dynamic_image) => {
                        let width = clipboard.width.unwrap();
                        let height = clipboard.height.unwrap();

                        let rgba_image = dynamic_image.to_rgba8();
                        let rgba_bytes = rgba_image.into_raw();
                        let _ = mexboard.write_image(rgba_bytes, width, height).await;
                    }
                    Err(err) => {
                        log::error!("Failed to decode image from database: {err}");
                    }
                }
            }
        }
        Err(_) => {
            log::error!("No clipboard in database!");
        }
    }

    Ok(())
}
