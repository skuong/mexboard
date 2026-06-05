use crate::crypto;
use crate::database::structs::InsertImageDbParams;
use crate::database::Database;
use tauri::State;

pub fn compare_and_insert_image_if_not_exists(
    image: (Vec<u8>, u32, u32),
    db: &State<'_, Database>,
) -> Result<u32, String> {
    let hash = crypto::hash_bytes::hash(&image.0);

    if let Ok(id) = db.check_duplication_by_hash(hash) {
        return Ok(id);
    }

    let insert_result = db.insert_image(InsertImageDbParams {
        hash: hash.as_bytes().to_vec(),
        image: image.0,
        width: image.1,
        height: image.2,
    });

    match insert_result {
        Ok(id) => return Ok(id),
        Err(err) => return Err(err),
    }
}
