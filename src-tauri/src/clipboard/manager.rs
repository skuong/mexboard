use super::image::{self, ImageCache};
use super::mexboard::MexBoard;
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};

pub struct ClipboardManager {
    clipboard: MexBoard,
    latest_image_cache: ImageCache,
}

impl ClipboardManager {
    pub fn new() -> Self {
        Self {
            clipboard: MexBoard::new(),
            latest_image_cache: ImageCache::new(),
        }
    }

    pub async fn read_text(&self) -> Result<String, String> {
        self.clipboard.read_text().await
    }

    pub async fn read_image(&self) -> Result<Option<(Vec<u8>, u32, u32)>, String> {
        self.clipboard.read_image().await
    }

    pub async fn write_text(&self, text: String) -> Result<(), String> {
        self.clipboard.write(text).await
    }

    pub async fn write_image(&self, base64_data: String) -> Result<(), String> {
        let png_bytes = BASE64
            .decode(&base64_data)
            .map_err(|e| format!("Failed to decode base64 image: {}", e))?;

        let (rgba_bytes, width, height) = image::decode_png_to_rgba(&png_bytes)
            .map_err(|e| format!("Failed to decode PNG: {}", e))?;

        self.clipboard.write_image(rgba_bytes, width, height).await
    }

    pub fn reinitialize(&self) -> Result<(), String> {
        self.clipboard.reinitialize()
    }
}
