use crate::database::{ClipboardItemRow, Database};
use tauri::State;

#[tauri::command]
#[specta::specta]
pub fn update_clipboard_item_note(
    id: i16,
    note: Option<String>,
    database: State<'_, Database>,
) -> Result<ClipboardItemRow, String> {
    database.update_note(id, note.as_deref())
}
