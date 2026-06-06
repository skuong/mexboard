use crate::websocket::WebSocketState;
use futures_util::StreamExt;
use std::sync::Arc;
use tauri::{command, AppHandle, Emitter, State};
use tokio_tungstenite::connect_async;
use tokio_tungstenite::tungstenite::client::IntoClientRequest;

#[command]
#[specta::specta]
pub async fn connect_websocket(
    state: State<'_, WebSocketState>,
    app: AppHandle,
    url_string: String,
    bearer_token: String,
) -> Result<(), String> {
    let read_handle = state.read_handle.read().await;
    if let Some(handle) = read_handle.as_ref() {
        handle.abort();
    }
    drop(read_handle);

    let mut request = url_string.into_client_request().unwrap();
    request.headers_mut().insert(
        "Authorization",
        format!("Bearer {}", bearer_token).parse().unwrap(),
    );

    let (ws_stream, _) = connect_async(request)
        .await
        .map_err(|err| format!("Connect failed: {}", err))?;

    let (write, mut read) = ws_stream.split();

    let app_clone = app.clone();
    let write_arc = Arc::clone(&state.write);

    let read_handle = tokio::spawn(async move {
        while let Some(read_result) = read.next().await {
            match read_result {
                Ok(message) => {
                    log::info!("message: {}", message.to_string());
                    let _ = app_clone.emit("ws-message", message.to_string());
                }
                Err(err) => {
                    let _ = app_clone.emit("ws-error", err.to_string());
                    let mut write_guard = write_arc.lock().await;
                    *write_guard = None;
                    break;
                }
            }
        }
    });

    let mut write_guard = state.write.lock().await;
    *write_guard = Some(write);
    drop(write_guard);

    let mut read_guard = state.read_handle.write().await;
    *read_guard = Some(read_handle);

    Ok(())
}
