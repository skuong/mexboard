use super::super::utils::*;
use super::super::Database;

impl Database {
    pub fn clear(&self) -> Result<(), String> {
        let inner = self.lock()?;
        let ci = &inner.schema.clipboards;

        inner.db.delete(*ci).execute().map_err(error_to_string)?;

        Ok(())
    }
}
