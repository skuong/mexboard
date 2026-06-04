import { Mime } from '@/features/clipboard/types/mime';

export type ClipboardItem = {
	id: number;

	sort_order: string;

	content?: string;

	/**
	 * The width of the image if it is one.
	 */
	width?: number;

	/**
	 * The height of the image if it is one.
	 */
	height?: number;

	hash: string;
	mime: Mime | (string & {});

	source_app?: string;

	is_favorite: boolean;
	note?: string;

	detected_date?: string;

	is_color: boolean;

	/**
	 * When `kv` is `_KVS`, the content is a set of key-value pairs.
	 * Otherwise, `kv` is the key of the key-value pair.
	 */
	kv?: '_KVS' | (string & {});

	is_secret: boolean;

	created_at: string;
	updated_at: string;
};
