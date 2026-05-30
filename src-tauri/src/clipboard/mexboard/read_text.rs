use crate::clipboard::mexboard::with_clipboard::with_clipboard;
use crate::clipboard::mexboard::MexBoard;

pub async fn read_text(mexboard: &MexBoard) -> Result<String, String> {
    let result = with_clipboard(mexboard, |clipboard| clipboard.get_text()).await;

    match result {
        Ok(text) => Ok(text),
        Err(arboard::Error::ContentNotAvailable) => Err("ContentNotAvailable".to_string()),
        Err(err) => Err(format!("Failed to read clipboard: {}", err)),
    }
}
