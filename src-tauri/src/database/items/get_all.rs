use super::super::utils::*;
use super::super::Database;
use crate::clipboard::PartialSelectClipboards;
use drizzle::sqlite::prelude::*;

impl Database {
    pub fn get_all(&self, limit: u8, offset: u8) -> Result<Vec<PartialSelectClipboards>, String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        let rows: Vec<PartialSelectClipboards> = drizzle
            .db
            .select(PartialSelectClipboards::Select)
            .from(*clipboards)
            .order_by(desc(clipboards.sort_order))
            .limit(limit as usize)
            .offset(offset as usize)
            .all()
            .map_err(error_to_string)?;

        Ok(rows)
    }
}
