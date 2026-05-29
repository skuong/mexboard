pub fn hash(content: &[u8]) -> blake3::Hash {
    blake3::hash(content)
}
