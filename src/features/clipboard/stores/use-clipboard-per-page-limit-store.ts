import { load } from '@tauri-apps/plugin-store';
import { create } from 'zustand';
import { clipboardPerPageLimitOptions } from '@/features/clipboard/constant/clipboard-per-page-limit-options';

type ClipboardPerPageLimitStore = {
	perPageLimit: number;
	setPerPageLimit: (limit: number) => void;
};

export const useClipboardPerPageLimitStore = create<ClipboardPerPageLimitStore>()((set) => ({
	perPageLimit: clipboardPerPageLimitOptions[0],
	setPerPageLimit: (limit) => {
		set(() => ({ perPageLimit: limit }));

		const syncPerPageLimitToTauriStore = async () => {
			const store = await load(import.meta.env.VITE_SETTINGS_FILE_NAME);
			store.set('clipboardPerPageLimit', limit);
		};

		syncPerPageLimitToTauriStore();
	},
}));
