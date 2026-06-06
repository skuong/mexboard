use crate::crypto;
use crate::database::{structs::InsertTextDbParams, Database};
use tauri::State;

pub fn compare_and_insert_text_if_not_exists(
    text: String,
    db: &State<'_, Database>,
) -> Result<(u32, bool), String> {
    let hash = crypto::hash_bytes::hash(text.as_bytes());

    if let Ok(id) = db.check_duplication_by_hash(hash) {
        return Ok((id, false));
    }

    let insert_result = db.insert_text(InsertTextDbParams {
        content: text,
        hash: hash.as_bytes().to_vec(),
    });

    match insert_result {
        Ok(id) => return Ok((id, true)),
        Err(err) => return Err(err),
    }
}
