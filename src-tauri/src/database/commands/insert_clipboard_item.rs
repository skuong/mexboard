use crate::database::{ClipboardItemRow, Database, InsertClipboardItemParams};
use tauri::State;

#[tauri::command]
#[specta::specta]
pub fn insert_clipboard_item(
    params: InsertClipboardItemParams,
    database: State<'_, Database>,
) -> Result<ClipboardItemRow, String> {
    database.insert_item(params)
}
