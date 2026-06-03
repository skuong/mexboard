use std::io::Cursor;

use super::super::utils::*;
use super::super::Database;
use crate::database::items::get_new_max_sort_order::get_new_max_sort_order;
use crate::database::structs::InsertImageDbParams;
use crate::schema::InsertClipboards;
use chrono::Utc;
use image::DynamicImage;
use image::Rgba;
use image::{ImageBuffer, ImageFormat};

impl Database {
    pub fn insert_image(&self, params: InsertImageDbParams) -> Result<(), String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        let sort_order = get_new_max_sort_order(&drizzle)?;
        let now = Utc::now().to_rfc3339();

        let image_preview = if let Some(rgba_buffer) =
            ImageBuffer::<Rgba<u8>, _>::from_raw(params.width, params.height, params.image.clone())
        {
            let img = DynamicImage::ImageRgba8(rgba_buffer);
            let thumbnail = img.thumbnail(400, 400);
            let mut buffer = Vec::new();

            if thumbnail
                .write_to(&mut Cursor::new(&mut buffer), ImageFormat::WebP)
                .is_ok()
            {
                Some(buffer)
            } else {
                None
            }
        } else {
            None
        };

        if let Some(preview) = image_preview {
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
                .with_image(params.image)
                .with_image_preview(preview)
                .with_width(params.width)
                .with_height(params.height)])
                .execute()
                .map_err(error_to_string)?;
        } else {
            log::error!("No preview image. Can't insert image")
        }

        Ok(())
    }
}
