use crate::database::{ClipboardItemRow, Database};
use tauri::State;

#[tauri::command]
#[specta::specta]
pub fn get_all_clipboard_items(
    limit: i16,
    offset: i16,
    favorites_first: bool,
    database: State<'_, Database>,
) -> Result<Vec<ClipboardItemRow>, String> {
    database.get_all_items(limit, offset, favorites_first)
}
