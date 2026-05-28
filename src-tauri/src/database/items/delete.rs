use super::super::utils::*;
use super::super::Database;
use drizzle::core::expr::*;

impl Database {
    pub fn delete(&self, id: i16) -> Result<(), String> {
        let inner = self.lock()?;
        let ci = &inner.schema.clipboards;

        inner
            .db
            .delete(*ci)
            .r#where(eq(ci.id, id as i64))
            .execute()
            .map_err(error_to_string)?;

        Ok(())
    }
}
