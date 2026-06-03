#[derive(Debug)]
pub struct InsertImageDbParams {
    pub hash: Vec<u8>,

    pub image: Vec<u8>,
    pub width: u32,
    pub height: u32,
}
