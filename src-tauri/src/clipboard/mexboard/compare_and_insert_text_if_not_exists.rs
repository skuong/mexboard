use crate::crypto;
use crate::database::{structs::InsertTextDbParams, Database};
use tauri::State;

pub fn compare_and_insert_text_if_not_exists(text: String, db: &State<'_, Database>) {
    let hash = crypto::hash_bytes::hash(text.as_bytes());

    if let Ok(_) = db.check_duplication_by_hash(hash) {
        return;
    }

    if let Err(err) = db.insert_text(InsertTextDbParams {
        content: Some(text),
        hash: hash.as_bytes().to_vec(),
    }) {
        log::error!("Failed to insert text: {}", err);
    }
}
