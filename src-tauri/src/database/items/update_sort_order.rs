use super::super::utils::*;
use super::super::Database;
use crate::schema::*;
use drizzle::core::expr::*;

impl Database {
    pub fn update_sort_order(&self, id: u32, sort_order: &str) -> Result<(), String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        drizzle
            .db
            .update(*clipboards)
            .set(UpdateClipboards::default().with_sort_order(sort_order))
            .r#where(eq(clipboards.id, id))
            .execute()
            .map_err(error_to_string)?;

        Ok(())
    }
}
