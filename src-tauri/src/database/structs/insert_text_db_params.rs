#[derive(Debug)]
pub struct InsertTextDbParams {
    pub content: Option<String>,

    pub hash: Vec<u8>,
}
