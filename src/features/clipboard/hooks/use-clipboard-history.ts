import { useState } from 'react';
import { useClipboardHistoryQuery } from '@/features/clipboard/hooks/use-clipboard-history-query';
import { useReorderClipboardItems } from '@/features/clipboard/hooks/use-reorder-clipboard-items';
import type { ClipboardContent } from '@/types/clipboard';

export const useClipboardHistory = (maxItems: number, favoritesFirst: boolean) => {
	const { history, historyRef, isLoaded, hasMore, loadMore } = useClipboardHistoryQuery(
		maxItems,
		favoritesFirst,
	);

	const [currentContent, setCurrentContent] = useState<ClipboardContent>({
		type: 'empty',
	});

	const reorderItems = useReorderClipboardItems(historyRef, maxItems, favoritesFirst);

	return {
		history,
		isLoaded,
		hasMore,
		loadMore,
		currentContent,
		setCurrentContent,
		reorderItems,
	};
};
