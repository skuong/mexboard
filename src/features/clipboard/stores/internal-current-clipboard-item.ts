import { create } from 'zustand';
import type { Clipboard } from '@/bindings';

type InternalCurrentClipboardItem = {
	currentClipboard?: Clipboard;
	setCurrentClipboard: (currentClipboard: Clipboard) => void;
};

export const useInternalCurrentClipboardItem = create<InternalCurrentClipboardItem>()((set) => ({
	currentClipboard: undefined,
	setCurrentClipboard: (currentClipboard: Clipboard) => set({ currentClipboard }),
}));
