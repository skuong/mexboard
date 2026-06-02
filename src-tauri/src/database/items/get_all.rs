use super::super::utils::*;
use super::super::Database;
use crate::clipboard::PartialSelectClipboards;
use drizzle::core::expr::{alias, count};
use drizzle::sqlite::prelude::*;

impl Database {
    pub fn get_all(
        &self,
        limit: u8,
        offset: u32,
    ) -> Result<(Vec<PartialSelectClipboards>, u32), String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        let items: Vec<PartialSelectClipboards> = drizzle
            .db
            .select(PartialSelectClipboards::Select)
            .from(*clipboards)
            .order_by(desc(clipboards.sort_order))
            .limit(limit as usize)
            .offset(offset as usize)
            .all()
            .map_err(error_to_string)?;

        let (total,): (u32,) = drizzle
            .db
            .select((alias(count(clipboards.id), "total"),))
            .from(*clipboards)
            .get()
            .map_err(error_to_string)?;

        Ok((items, total))
    }
}
