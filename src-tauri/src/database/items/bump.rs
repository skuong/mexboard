use super::super::utils::*;
use super::super::Database;
use crate::schema::*;
use drizzle::core::expr::*;

impl Database {
    pub fn bump(&self, id: u32, sort_order: &str) -> Result<(), String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;
        let now = timestamp_now();

        drizzle
            .db
            .update(*clipboards)
            .set(
                UpdateClipboards::default()
                    .with_sort_order(sort_order)
                    .with_updated_at(&now),
            )
            .r#where(eq(clipboards.id, id))
            .execute()
            .map_err(error_to_string)?;

        Ok(())
    }
}
