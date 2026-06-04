use super::super::utils::*;
use super::super::Database;

impl Database {
    pub fn clear(&self) -> Result<(), String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        drizzle
            .db
            .delete(*clipboards)
            .execute()
            .map_err(error_to_string)?;

        Ok(())
    }
}
