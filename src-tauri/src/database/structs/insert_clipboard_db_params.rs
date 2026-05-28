#[derive(Debug)]
pub struct InsertClipboardDbParams {
    pub content: Option<String>,

    pub image: Option<String>,
    pub width: Option<u32>,
    pub height: Option<u32>,
}
