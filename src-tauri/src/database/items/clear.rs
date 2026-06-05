use super::super::utils::*;
use super::super::Database;

impl Database {
    pub fn clear(&self) -> Result<(), String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        drizzle
            .db
            .delete(*clipboards)
            .execute()
            .map_err(error_to_string)?;

        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::database::structs::InsertTextDbParams;

    #[test]
    fn test_clear() {
        let db = Database::new(":memory:").expect("Failed to create in-memory database");

        let params = InsertTextDbParams {
            content: "Test clipboard item".to_string(),
            hash: vec![1, 2, 3],
        };
        db.insert_text(params).expect("Failed to insert test item");

        let (_, count) = db.get_all(10, 0).expect("Failed to get items");
        assert_eq!(count, 1, "Database should have 1 item before clear");

        db.clear().expect("Failed to clear database");

        let (items, count) = db.get_all(10, 0).expect("Failed to get items after clear");
        assert_eq!(count, 0, "Database should be empty after clear");
        assert!(items.is_empty(), "Items vector should be empty");
    }
}
