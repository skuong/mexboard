import { Clipboard } from '@/bindings';
import { create } from 'zustand';

type InternalCurrentClipboardItem = {
	currentClipboard?: Clipboard;
	setCurrentClipboard: (currentClipboard: Clipboard) => void;
};

export const useInternalCurrentClipboardItem = create<InternalCurrentClipboardItem>()((set) => ({
	currentClipboard: undefined,
	setCurrentClipboard: (currentClipboard: Clipboard) => set({ currentClipboard }),
}));
