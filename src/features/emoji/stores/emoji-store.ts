import { load } from '@tauri-apps/plugin-store';
import { create } from 'zustand';

const RECENT_EMOJI_STORE_KEY = 'emojiRecentlyUsed';
const MAX_RECENT_EMOJIS = 24;

type EmojiState = {
	recentEmojis: string[];
	hydrateRecentEmojis: () => Promise<void>;
	addRecentEmoji: (emoji: string) => void;
};

let persistenceQueue: Promise<void> = Promise.resolve();
let hydrationPromise: Promise<void> | undefined;

export const useEmojiStore = create<EmojiState>()((set, get) => ({
	recentEmojis: [],

	hydrateRecentEmojis: () => {
		if (hydrationPromise) return hydrationPromise;

		hydrationPromise = (async () => {
			try {
				const store = await load(import.meta.env.VITE_SETTINGS_FILE_NAME);
				const savedEmojis = await store.get<unknown>(RECENT_EMOJI_STORE_KEY);
				const recentEmojis = Array.isArray(savedEmojis)
					? savedEmojis.filter((emoji): emoji is string => typeof emoji === 'string')
					: [];

				if (get().recentEmojis.length === 0) {
					set({ recentEmojis: recentEmojis.slice(0, MAX_RECENT_EMOJIS) });
				}
			} catch {
				// The picker remains usable if saved settings are unavailable.
			} finally {
				hydrationPromise = undefined;
			}
		})();

		return hydrationPromise;
	},

	addRecentEmoji: (emoji) => {
		let recentEmojis: string[] = [];

		set((state) => {
			recentEmojis = [emoji, ...state.recentEmojis.filter((item) => item !== emoji)].slice(
				0,
				MAX_RECENT_EMOJIS,
			);
			return { recentEmojis };
		});

		persistenceQueue = persistenceQueue
			.catch(() => undefined)
			.then(async () => {
				const store = await load(import.meta.env.VITE_SETTINGS_FILE_NAME);
				await store.set(RECENT_EMOJI_STORE_KEY, recentEmojis);
				await store.save();
			})
			.catch(() => undefined);
	},
}));
