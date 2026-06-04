import { useQueryClient } from '@tanstack/react-query';
import { generateKeyBetween } from 'jittered-fractional-indexing';
import { type RefObject, useCallback } from 'react';
import {
	type ClipboardHistoryPage,
	clipboardHistoryQueryKey,
} from '@/features/clipboard/hooks/use-clipboard-history-query';
import type { ClipboardItem } from '@/types/clipboard';

type InfiniteData = {
	pages: ClipboardHistoryPage[];
	pageParams: number[];
};

export const useReorderClipboardItems = (
	historyRef: RefObject<ClipboardItem[]>,
	maxItems: number,
	favoritesFirst: boolean,
) => {
	const queryClient = useQueryClient();

	return useCallback(
		async (activeId: number, overId: number) => {
			const items = historyRef.current;
			const oldIndex = items.findIndex((i) => i.id === activeId);
			const newIndex = items.findIndex((i) => i.id === overId);
			if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

			const reordered = [...items];
			const [moved] = reordered.splice(oldIndex, 1);
			reordered.splice(newIndex, 0, moved);

			const before = newIndex > 0 ? reordered[newIndex - 1].sort_order : null;
			const after = newIndex < reordered.length - 1 ? reordered[newIndex + 1].sort_order : null;
			const newSortOrder = generateKeyBetween(before, after);

			const updated = { ...moved, sort_order: newSortOrder };
			queryClient.setQueryData<InfiniteData>(
				clipboardHistoryQueryKey(maxItems, favoritesFirst),
				(old) => {
					if (!old) return old;
					const newItems = reordered.map((item) => (item.id === activeId ? updated : item));
					const lastHasMore = old.pages[old.pages.length - 1]?.hasMore ?? false;
					return {
						...old,
						pages: [{ items: newItems, hasMore: lastHasMore }],
						pageParams: [0],
					};
				},
			);
		},
		[historyRef, maxItems, favoritesFirst, queryClient],
	);
};
