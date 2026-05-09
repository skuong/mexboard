use crate::database::{ClipboardItemRow, Database};
use tauri::State;

#[tauri::command]
#[specta::specta]
pub fn bump_clipboard_item(
    id: i16,
    sort_order: String,
    database: State<'_, Database>,
) -> Result<ClipboardItemRow, String> {
    database.bump_item(id, &sort_order)
}
