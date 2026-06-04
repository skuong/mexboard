use crate::crypto;
use crate::database::{structs::insert_clipboard_db_params::InsertClipboardDbParams, Database};
use tauri::State;

pub fn compare_and_insert_text_if_not_exists(text: String, db: &State<'_, Database>) {
    let hash = crypto::hash_bytes::hash(text.as_bytes());

    if let Ok(_) = db.check_duplication_by_hash(hash) {
        return;
    }

    if let Err(err) = db.insert_text(InsertClipboardDbParams {
        content: Some(text),
        hash: hash.as_bytes().to_vec(),
        image: None,
        width: None,
        height: None,
    }) {
        log::error!("Failed to insert text: {}", err);
    }
}
