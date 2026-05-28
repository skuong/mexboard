pub fn error_to_string<Error: std::fmt::Display>(error: Error) -> String {
    error.to_string()
}

pub fn timestamp_now() -> String {
    let duration = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap_or_default();
    format!("{}", duration.as_millis())
}
