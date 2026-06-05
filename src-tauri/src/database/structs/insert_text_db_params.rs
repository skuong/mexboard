#[derive(Debug)]
pub struct InsertTextDbParams {
    pub content: String,
    pub hash: Vec<u8>,
}
