use crate::clipboard::mexboard::with_clipboard::with_clipboard;
use crate::clipboard::mexboard::MexBoard;

pub async fn write_image(
    mexboard: &MexBoard,
    rgba_bytes: Vec<u8>,
    width: u32,
    height: u32,
) -> Result<(), String> {
    let image_data = arboard::ImageData {
        width: width as usize,
        height: height as usize,
        bytes: rgba_bytes.into(),
    };

    let result = with_clipboard(mexboard, |clipboard| {
        clipboard.set_image(image_data.clone())
    })
    .await;

    result.map_err(|err| format!("Failed to write image: {}", err))
}
