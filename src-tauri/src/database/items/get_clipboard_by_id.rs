use crate::schema::SelectClipboards;

use super::super::Database;
use drizzle::core::expr::eq;

impl Database {
    pub fn get_clipboard_by_id(&self, id: u32) -> Result<SelectClipboards, String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        let clipboard: Result<SelectClipboards, _> = drizzle
            .db
            .select(())
            .from(*clipboards)
            .r#where(eq(clipboards.id, id))
            .get();

        match clipboard {
            Ok(clipboard) => Ok(clipboard),
            Err(err) => Err(err.to_string()),
        }
    }
}
