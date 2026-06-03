use super::super::utils::*;
use super::super::Database;
use crate::database::items::get_new_max_sort_order::get_new_max_sort_order;
use crate::schema::InsertClipboards;
use chrono::Utc;

use super::super::structs::insert_clipboard_db_params::InsertClipboardDbParams;

impl Database {
    pub fn insert_image(&self, params: InsertClipboardDbParams) -> Result<(), String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        if let Some(image) = params.image {
            let sort_order = get_new_max_sort_order(&drizzle)?;
            let now = Utc::now().to_rfc3339();

            drizzle
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
                .with_image(image)])
                .execute()
                .map_err(error_to_string)?;
        }

        Ok(())
    }
}
