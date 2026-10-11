import { create } from 'zustand';

type EmojiSearchQueryState = {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
};

export const useEmojiSearchQueryStore = create<EmojiSearchQueryState>()((set) => ({
	searchQuery: '',
	setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
