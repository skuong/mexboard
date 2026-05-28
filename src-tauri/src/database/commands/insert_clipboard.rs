use crate::database::Database;
use serde::Deserialize;
use tauri::State;

use super::super::structs::insert_clipboard_db_params::InsertClipboardDbParams;

#[derive(Debug, Deserialize, specta::Type)]
pub struct InsertClipboardParams {
    content: Option<String>,

    image: Option<String>,
    width: Option<u32>,
    height: Option<u32>,
}

#[tauri::command]
#[specta::specta]
pub fn insert_clipboard(params: InsertClipboardParams, database: State<'_, Database>) {
    database.insert(InsertClipboardDbParams {
        content: params.content,
        image: params.image,
        width: params.width,
        height: params.height,
    })
}
