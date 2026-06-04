use crate::database::Database;
use tauri::{
    http::Request, http::Response, http::StatusCode, Manager, UriSchemeContext, UriSchemeResponder,
    Wry,
};

pub fn image_protocol_handler(
    context: UriSchemeContext<'_, Wry>,
    request: Request<Vec<u8>>,
    responder: UriSchemeResponder,
) {
    let app = context.app_handle();
    let db = app.state::<Database>();

    let path = request.uri().path();

    if !path.starts_with("/preview") {
        return;
    }

    let query = request.uri().query().unwrap_or("");
    let id_result = url::form_urlencoded::parse(query.as_bytes())
        .find(|(key, _)| key == "id")
        .map(|(_, value)| value.parse::<u32>());

    let id = match id_result {
        Some(Ok(parsed_id)) => parsed_id,
        _ => {
            responder.respond(
                Response::builder()
                    .status(StatusCode::BAD_REQUEST)
                    .body(Vec::new())
                    .unwrap(),
            );
            return;
        }
    };

    match db.get_image_by_id(id) {
        Ok(Some(image_bytes)) => {
            responder.respond(
                Response::builder()
                    .header("Content-Type", "image/webp")
                    .body(image_bytes)
                    .unwrap(),
            );
        }
        Ok(None) => {
            responder.respond(
                Response::builder()
                    .status(StatusCode::NOT_FOUND)
                    .body(Vec::new())
                    .unwrap(),
            );
        }
        Err(_) => {
            responder.respond(
                Response::builder()
                    .status(StatusCode::INTERNAL_SERVER_ERROR)
                    .body(Vec::new())
                    .unwrap(),
            );
        }
    }
}
