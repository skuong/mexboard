use crate::{
    clipboard::{Clipboard, ClipboardsResponse},
    database::Database,
};
use tauri::State;

#[tauri::command]
#[specta::specta]
pub fn get_all_clipboard_items(
    limit: u8,
    offset: u32,
    database: State<'_, Database>,
) -> Result<ClipboardsResponse, String> {
    database
        .get_all(limit, offset)
        .map(|(rows, total)| ClipboardsResponse {
            items: rows.into_iter().map(Clipboard::from).collect(),
            total,
        })
}
