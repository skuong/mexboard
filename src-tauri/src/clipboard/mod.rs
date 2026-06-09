mod commands;
mod image;
mod manager;
mod mexboard;
pub mod monitoring;

use drizzle::sqlite::SQLiteFromRow;
pub use manager::ClipboardManager;
use serde::{Deserialize, Serialize};

pub(crate) use commands::write_clipboard_item_to_system_clipboard;
pub(crate) use mexboard::compare_and_insert_image_if_not_exists;
pub(crate) use mexboard::compare_and_insert_text_if_not_exists;

use crate::schema::SelectClipboards;

#[derive(Debug, Serialize, Deserialize, Clone, specta::Type)]
pub struct Clipboard {
    pub id: u32,

    pub sort_order: String,

    pub content: Option<String>,

    pub image: Option<Vec<u8>>,
    pub image_preview: Option<Vec<u8>>,
    pub width: Option<u32>,
    pub height: Option<u32>,

    pub hash: Vec<u8>,
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

#[derive(Debug, Serialize, Deserialize, Clone, specta::Type)]
pub struct ClipboardsResponse {
    pub items: Vec<Clipboard>,
    pub total: u32,
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

#[derive(Debug, Serialize, Deserialize, Clone, specta::Type, SQLiteFromRow)]
#[from(crate::schema::Clipboards)]
pub struct PartialSelectClipboards {
    pub id: u32,
    pub content: Option<String>,
    pub sort_order: String,
    pub width: Option<u32>,
    pub height: Option<u32>,
    pub hash: Vec<u8>,
    pub mime: Option<String>,
    pub is_favorite: bool,
    pub is_color: bool,
    pub is_secret: bool,
    pub created_at: String,
    pub updated_at: String,
}

impl From<SelectClipboards> for PartialSelectClipboards {
    fn from(item: SelectClipboards) -> Self {
        Self {
            id: item.id,
            sort_order: item.sort_order,

            content: item.content,

            width: item.width,
            height: item.height,

            hash: item.hash,

            mime: item.mime,
            is_favorite: item.is_favorite,
            is_color: item.is_color,
            is_secret: item.is_secret,
            created_at: item.created_at,
            updated_at: item.updated_at,
        }
    }
}

impl From<PartialSelectClipboards> for Clipboard {
    fn from(item: PartialSelectClipboards) -> Self {
        Self {
            id: item.id,
            sort_order: item.sort_order,

            content: item.content,

            width: item.width,
            height: item.height,

            hash: item.hash,

            mime: item.mime,

            is_favorite: item.is_favorite,
            is_color: item.is_color,
            is_secret: item.is_secret,

            created_at: item.created_at,
            updated_at: item.updated_at,

            image: None,
            image_preview: None,
            source_app: None,
            note: None,
            detected_date: None,
            kv: None,
        }
    }
}

#[derive(Debug, Clone, SQLiteFromRow)]
#[from(crate::schema::Clipboards)]
pub struct OnlyIdSelectClipboards {
    pub id: u32,
}
