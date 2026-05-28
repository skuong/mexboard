mod image;
mod manager;
mod mexboard;

pub use manager::ClipboardManager;
use serde::{Deserialize, Serialize};

use crate::schema::SelectClipboards;

#[derive(Debug, Serialize, Deserialize, Clone, specta::Type)]
pub struct Clipboard {
    pub id: u32,

    pub sort_order: String,

    pub content: Option<String>,

    pub image: Option<u8>,
    pub image_preview: Option<u8>,
    pub width: Option<u32>,
    pub height: Option<u32>,

    pub hash: String,
    pub mime: Option<String>,

    pub source_app: Option<String>,

    pub is_favorite: bool,
    pub note: Option<String>,

    pub detected_date: Option<String>,

    pub is_color: bool,

    pub kv: Option<String>,

    pub is_secret: bool,

    pub created_at: String,
    pub updated_at: String,
}

impl From<SelectClipboards> for Clipboard {
    fn from(item: SelectClipboards) -> Self {
        Self {
            id: item.id,
            sort_order: item.sort_order,

            content: item.content,

            image: item.image,
            image_preview: item.image_preview,
            width: item.width,
            height: item.height,

            hash: item.hash,
            mime: item.mime,

            source_app: item.source_app,

            is_favorite: item.is_favorite,
            note: item.note,

            detected_date: item.detected_date,
            is_color: item.is_color,

            kv: item.kv,
            is_secret: item.is_secret,

            created_at: item.created_at,
            updated_at: item.updated_at,
        }
    }
}
