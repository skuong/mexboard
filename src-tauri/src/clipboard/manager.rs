use super::mexboard::MexBoard;

pub struct ClipboardManager {
    clipboard: MexBoard,
}

impl ClipboardManager {
    pub fn new() -> Self {
        Self {
            clipboard: MexBoard::new(),
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

    pub async fn write_image(
        &self,
        rgba_bytes: Vec<u8>,
        width: u32,
        height: u32,
    ) -> Result<(), String> {
        self.clipboard.write_image(rgba_bytes, width, height).await
    }

    pub fn reinitialize(&self) -> Result<(), String> {
        self.clipboard.reinitialize()
    }
}
