use super::super::utils::*;
use super::super::Database;
use crate::schema::*;

impl Database {
    pub fn get_all(&self, limit: u8, offset: u8) -> Result<Vec<SelectClipboards>, String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        let rows: Vec<SelectClipboards> = drizzle
            .db
            .select(())
            .from(*clipboards)
            .limit(limit as usize)
            .offset(offset as usize)
            .all()
            .map_err(error_to_string)?;

        Ok(rows)
    }
}
