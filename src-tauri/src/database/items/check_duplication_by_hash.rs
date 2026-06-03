use crate::clipboard::OnlyIdSelectClipboards;

use super::super::utils::*;
use super::super::Database;
use drizzle::core::expr::eq;

impl Database {
    pub fn check_duplication_by_hash(&self, hash: blake3::Hash) -> Result<u32, String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        let clipboard: OnlyIdSelectClipboards = drizzle
            .db
            .select((clipboards.id,))
            .from(*clipboards)
            .r#where(eq(clipboards.hash, hash.as_bytes()))
            .get()
            .map_err(error_to_string)?;

        Ok(clipboard.id)
    }
}
