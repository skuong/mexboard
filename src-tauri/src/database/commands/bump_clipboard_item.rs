use crate::database::Database;
use tauri::State;

#[tauri::command]
#[specta::specta]
pub fn bump_clipboard_item(
    id: u32,
    sort_order: String,
    database: State<'_, Database>,
) -> Result<(), String> {
    database.bump(id, &sort_order)
}
