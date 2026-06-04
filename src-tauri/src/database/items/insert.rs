use super::super::structs::InsertTextDbParams;
use super::super::Database;

impl Database {
    pub fn insert(&self, params: InsertTextDbParams) -> Result<(), String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        drizzle.db.insert(*clipboards);
        Ok(())
    }
}
