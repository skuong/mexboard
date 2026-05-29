use tauri::AppHandle;
use tauri_plugin_deep_link::DeepLinkExt;
use tauri_plugin_notification::NotificationExt;

pub fn handle_links(app: &AppHandle) {
    let start_urls = app.deep_link().get_current().unwrap_or_default();
    if let Some(urls) = start_urls {
        log::info!("deep link URLs (likely a cold start): {:?}", urls);
    }

    let app_handle = app.clone();
    app.deep_link().on_open_url(move |event| {
        let urls = event.urls();

        log::info!("deep link URLs: {:?}", urls);
        if let Some(url) = urls.first() {
            let _ = app_handle
                .notification()
                .builder()
                .title("Mexboard")
                .body(format!("Authentication received: {}", url))
                .show();
        }
    });
}

pub fn register_all(app: &AppHandle) {
    #[cfg(any(target_os = "linux", all(debug_assertions, windows)))]
    app.deep_link().register_all().unwrap_or_default();
}
