use crate::clipboard::mexboard::with_clipboard::with_clipboard;
use crate::clipboard::mexboard::MexBoard;

pub async fn read_image(mexboard: &MexBoard) -> Result<Option<(Vec<u8>, u32, u32)>, String> {
    let result = with_clipboard(mexboard, |clipboard| clipboard.get_image()).await;

    match result {
        Ok(image_data) => {
            let width = image_data.width as u32;
            let height = image_data.height as u32;
            let rgba_bytes = image_data.bytes.into_owned();

            Ok(Some((rgba_bytes, width, height)))
        }
        Err(arboard::Error::ContentNotAvailable) => Ok(None),
        Err(err) => Err(format!("Failed to read image: {}", err)),
    }
}
