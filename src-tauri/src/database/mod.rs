pub mod commands;
pub use commands::*;
pub mod initialization;
mod items;
mod utils;
use crate::schema::Schema;
use drizzle::sqlite::rusqlite::Drizzle;
use rusqlite::Connection;
use std::sync::Mutex;
pub(crate) use utils::*;
mod structs;

pub struct Database {
    drizzle: Mutex<DrizzleState>,
}

struct DrizzleState {
    db: Drizzle,
    schema: Schema,
}

impl Database {
    pub fn new(db_path: &str) -> Result<Self, String> {
        let conn = Connection::open(db_path).map_err(error_to_string)?;

        conn.execute_batch("PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;")
            .map_err(error_to_string)?;

        let (db, _) = Drizzle::new(conn, ());
        let schema = Schema::new();
        db.push(&schema).map_err(error_to_string)?;

        db.conn()
            .execute(
                "CREATE INDEX IF NOT EXISTS idx_clipboards_hash ON clipboards(hash)",
                [],
            )
            .map_err(error_to_string)?;

        let schema = Schema::new();
        let inner = DrizzleState { db, schema };
        Ok(Self {
            drizzle: Mutex::new(inner),
        })
    }

    fn lock(&self) -> Result<std::sync::MutexGuard<'_, DrizzleState>, String> {
        self.drizzle.lock().map_err(error_to_string)
    }
}
