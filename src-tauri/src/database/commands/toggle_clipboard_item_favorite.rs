use crate::database::{ClipboardItemRow, Database};
use tauri::State;

#[tauri::command]
#[specta::specta]
pub fn toggle_clipboard_item_favorite(
    id: i16,
    database: State<'_, Database>,
) -> Result<ClipboardItemRow, String> {
    database.toggle_favorite(id)
}
