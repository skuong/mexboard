use std::io::Cursor;

use super::super::utils::*;
use super::super::Database;
use crate::clipboard::OnlyIdSelectClipboards;
use crate::database::items::get_new_max_sort_order::get_new_max_sort_order;
use crate::database::structs::InsertImageDbParams;
use crate::schema::InsertClipboards;
use chrono::Utc;
use image::DynamicImage;
use image::Rgba;
use image::{ImageBuffer, ImageFormat};

impl Database {
    pub fn insert_image(&self, params: InsertImageDbParams) -> Result<u32, String> {
        let drizzle = self.lock()?;
        let clipboards = &drizzle.schema.clipboards;

        let sort_order = get_new_max_sort_order(&drizzle)?;
        let now = Utc::now().to_rfc3339();

        let dynamic_image =
            ImageBuffer::<Rgba<u8>, _>::from_raw(params.width, params.height, params.image)
                .map(DynamicImage::ImageRgba8)
                .ok_or_else(|| "Failed to create image buffer from raw bytes".to_string())?;

        let mut image_webp = Vec::new();
        dynamic_image
            .write_to(&mut Cursor::new(&mut image_webp), ImageFormat::WebP)
            .map_err(|err| format!("Failed to encode image to WebP: {}", err))?;

        let mut preview_webp = Vec::new();
        dynamic_image
            .thumbnail(400, 400)
            .write_to(&mut Cursor::new(&mut preview_webp), ImageFormat::WebP)
            .map_err(|err| format!("Failed to encode image to WebP: {}", err))?;

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
            .with_image(image_webp)
            .with_image_preview(preview_webp)
            .with_width(params.width)
            .with_height(params.height)])
            .returning(OnlyIdSelectClipboards::Select)
            .get()
            .map_err(error_to_string)?;

        Ok(clipboard.id)
    }
}
