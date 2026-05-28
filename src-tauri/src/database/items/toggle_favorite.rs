use super::super::utils::*;
use super::super::Database;
use crate::schema::*;
use drizzle::core::expr::*;

impl Database {
    pub fn toggle_is_favorite(&self, id: u32) -> Result<bool, String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        let current: SelectClipboards = drizzle
            .db
            .select(())
            .from(*clipboards)
            .r#where(eq(clipboards.id, id))
            .get()
            .map_err(error_to_string)?;

        drizzle
            .db
            .update(*clipboards)
            .set(UpdateClipboards::default().with_is_favorite(!current.is_favorite))
            .r#where(eq(clipboards.id, id))
            .execute()
            .map_err(error_to_string)?;

        Ok(!current.is_favorite)
    }
}
