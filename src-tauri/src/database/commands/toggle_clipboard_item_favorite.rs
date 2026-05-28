use crate::database::Database;
use tauri::State;

#[tauri::command]
#[specta::specta]
pub fn toggle_clipboard_item_favorite(
    id: u32,
    database: State<'_, Database>,
) -> Result<bool, String> {
    database.toggle_is_favorite(id)
}
