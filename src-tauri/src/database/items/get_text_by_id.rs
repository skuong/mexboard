use super::super::Database;
use drizzle::core::expr::eq;

impl Database {
    pub fn get_text_by_id(&self, id: u32) -> Result<Option<String>, String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        let clipboard_result = drizzle
            .db
            .select((clipboards.content,))
            .from(*clipboards)
            .r#where(eq(clipboards.id, id))
            .get();

        match clipboard_result {
            Ok((text_content,)) => Ok(text_content),
            Err(_) => Ok(None),
        }
    }
}
