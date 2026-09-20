#[cfg(target_os = "linux")]
mod linux;

pub fn init() {
    #[cfg(target_os = "linux")]
    linux::init();
}
