use crate::database::{Database, UpdateSortOrderParams};
use tauri::State;

#[tauri::command]
#[specta::specta]
pub fn update_clipboard_sort_order(
    items: Vec<UpdateSortOrderParams>,
    database: State<'_, Database>,
) -> Result<(), String> {
    database.update_sort_orders(items)
}
