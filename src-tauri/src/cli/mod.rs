use tauri_plugin_cli::CliExt;
use url::Url;

const DEEP_LINK_SCHEME: &str = "mexboard";

pub fn handle_cli_args<R: tauri::Runtime>(
    manager: &impl tauri::Manager<R>,
    args: Option<Vec<String>>,
) {
    log::info!("CLI args: {:?}", args);

    if args
        .as_ref()
        .is_some_and(|args| contains_deep_link_arg(args))
    {
        log::info!("Skipping CLI parsing for deep link args");
        return;
    }

    let arguments = match args {
        Some(args) => manager.cli().matches_from(args),
        None => manager.cli().matches(),
    };

    let matches = match arguments {
        Ok(matches) => matches,
        Err(err) => {
            log::error!("Failed to parse CLI matches: {:?}", err);
            return;
        }
    };

    match matches.subcommand {
        Some(subcommand) if subcommand.name == "show" => {
            if let Some(window) = manager.get_webview_window("main") {
                window.show().ok();
                window.set_focus().ok();
            }
        }
        _ => {}
    }
}

fn contains_deep_link_arg(args: &[String]) -> bool {
    args.iter().any(|arg| is_deep_link_arg(arg))
}

fn is_deep_link_arg(arg: &str) -> bool {
    matches!(Url::parse(arg), Ok(url) if url.scheme() == DEEP_LINK_SCHEME)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn detects_mexboard_deep_link_args() {
        let args = vec![
            "target/debug/mexboard".to_string(),
            "mexboard://api/auth/magic-link/verify?token=abc".to_string(),
        ];

        assert!(contains_deep_link_arg(&args));
    }

    #[test]
    fn does_not_treat_regular_cli_args_as_deep_links() {
        let args = vec![
            "target/debug/mexboard".to_string(),
            "show".to_string(),
            "--tab=clipboards".to_string(),
        ];

        assert!(!contains_deep_link_arg(&args));
    }
}
