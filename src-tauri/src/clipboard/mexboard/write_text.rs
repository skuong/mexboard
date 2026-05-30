use crate::clipboard::mexboard::with_clipboard::with_clipboard;
use crate::clipboard::mexboard::MexBoard;

pub async fn write_text(mexboard: &MexBoard, text: String) -> Result<(), String> {
    let result = with_clipboard(mexboard, |clipboard| clipboard.set_text(text.clone())).await;

    result.map_err(|err| format!("Failed to write clipboard: {}", err))
}
