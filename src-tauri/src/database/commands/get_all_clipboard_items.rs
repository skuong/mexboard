use crate::{clipboard::Clipboard, database::Database};
use tauri::State;

#[tauri::command]
#[specta::specta]
pub fn get_all_clipboard_items(
    limit: u8,
    offset: u8,
    database: State<'_, Database>,
) -> Result<Vec<Clipboard>, String> {
    database
        .get_all(limit, offset)
        .map(|rows| rows.into_iter().map(Clipboard::from).collect())
}
