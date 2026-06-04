use super::super::Database;
use drizzle::core::expr::eq;

impl Database {
    pub fn get_image_by_id(&self, id: u32) -> Result<Option<Vec<u8>>, String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        let clipboard_result: Result<(Option<Vec<u8>>,), _> = drizzle
            .db
            .select((clipboards.image,))
            .from(*clipboards)
            .r#where(eq(clipboards.id, id))
            .get();

        match clipboard_result {
            Ok((image,)) => Ok(image),
            Err(_) => Ok(None),
        }
    }
}
