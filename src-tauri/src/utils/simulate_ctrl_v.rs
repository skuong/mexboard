use enigo::{Direction, Enigo, Key, Keyboard, Settings};
use std::time::Duration;
use tokio::time::sleep;

pub async fn simulate_ctrl_v() -> Result<(), String> {
    let mut enigo = Enigo::new(&Settings::default()).map_err(|err| err.to_string())?;

    #[cfg(target_os = "macos")]
    let modifier = Key::Command;
    #[cfg(not(target_os = "macos"))]
    let modifier = Key::Control;

    sleep(Duration::from_millis(150)).await;

    enigo
        .key(modifier, Direction::Press)
        .map_err(|err| err.to_string())?;
    sleep(Duration::from_millis(20)).await;

    enigo
        .key(Key::Unicode('v'), Direction::Click)
        .map_err(|err| err.to_string())?;
    sleep(Duration::from_millis(20)).await;

    enigo
        .key(modifier, Direction::Release)
        .map_err(|err| err.to_string())?;

    Ok(())
}
