mod is_clipboard_instance_exists;
mod read_image;
mod read_text;
mod write_image;
mod write_text;

use is_clipboard_instance_exists::is_clipboard_instance_exists;
use read_image::read_image;
use read_text::read_text;
use write_image::write_image;
use write_text::write_text;

use arboard;
use std::sync::Mutex;

pub struct MexBoard {
    clipboard: Mutex<Option<arboard::Clipboard>>,
}

impl MexBoard {
    pub fn new() -> Self {
        Self {
            clipboard: Mutex::new(None),
        }
    }

    fn is_clipboard_instance_exists(&self) -> Result<(), String> {
        is_clipboard_instance_exists(&self)
    }

    pub async fn read_text(&self) -> Result<String, String> {
        read_text(&self).await
    }

    pub async fn read_image(&self) -> Result<Option<(Vec<u8>, u32, u32)>, String> {
        read_image(&self).await
    }

    pub async fn write(&self, text: String) -> Result<(), String> {
        write_text(&self, text).await
    }

    pub async fn write_image(
        &self,
        rgba_bytes: Vec<u8>,
        width: u32,
        height: u32,
    ) -> Result<(), String> {
        write_image(&self, rgba_bytes, width, height).await
    }

    pub fn reinitialize(&self) -> Result<(), String> {
        if let Ok(mut guard) = self.clipboard.lock() {
            *guard = None;
        }
        self.is_clipboard_instance_exists()
    }
}
