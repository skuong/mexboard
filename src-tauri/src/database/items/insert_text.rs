use crate::clipboard::OnlyIdSelectClipboards;
use crate::database::items::get_new_max_sort_order::get_new_max_sort_order;
use crate::schema::InsertClipboards;

use super::super::utils::*;
use super::super::Database;
use chrono::Utc;

use super::super::structs::InsertTextDbParams;

impl Database {
    pub fn insert_text(&self, params: InsertTextDbParams) -> Result<u32, String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        let sort_order = get_new_max_sort_order(&drizzle)?;
        let now = Utc::now().to_rfc3339();

        let clipboard = drizzle
            .db
            .insert(*clipboards)
            .values([InsertClipboards::new(
                sort_order,
                params.hash,
                false,
                false,
                false,
                now.clone(),
                now,
            )
            .with_content(params.content)])
            .returning(OnlyIdSelectClipboards::Select)
            .get()
            .map_err(error_to_string)?;

        Ok(clipboard.id)
    }
}
