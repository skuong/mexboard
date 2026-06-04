use crate::crypto;
use crate::database::structs::InsertImageDbParams;
use crate::database::Database;
use tauri::State;

pub fn compare_and_insert_image_if_not_exists(
    image: (Vec<u8>, u32, u32),
    db: &State<'_, Database>,
) {
    let hash = crypto::hash_bytes::hash(&image.0);

    if let Ok(_) = db.check_duplication_by_hash(hash) {
        return;
    }

    if let Err(err) = db.insert_image(InsertImageDbParams {
        hash: hash.as_bytes().to_vec(),
        image: image.0,
        width: image.1,
        height: image.2,
    }) {
        log::error!("Failed to insert image: {}", err);
    }
}
