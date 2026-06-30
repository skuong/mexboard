import { load } from '@tauri-apps/plugin-store';
import { useEffect } from 'react';
import { EmptyState } from '@/components/clipboard-empty-state';
import { InfiniteScrollSentinelListItem } from '@/features/clipboard/components/infinite-scroll-sentinel-list-item';
import { SortableClipboardItem } from '@/features/clipboard/components/sortable-clipboard-item';
import { useClipboards } from '@/features/clipboard/hooks/use-clipboards';
import { useClipboardSearchQueryStore } from '@/features/clipboard/stores/clipboard-search-query-store';
import { useClipboardPerPageLimitStore } from '@/features/clipboard/stores/use-clipboard-per-page-limit-store';

export const ClipboardList = () => {
	const { perPageLimit, setPerPageLimit } = useClipboardPerPageLimitStore();
	const { data, hasNextPage } = useClipboards(perPageLimit);

	useEffect(() => {
		const getPerPageLimitFromTauriStore = async () => {
			const store = await load(import.meta.env.VITE_SETTINGS_FILE_NAME);
			const limit = await store.get<number>('clipboardPerPageLimit');
			if (limit && perPageLimit !== limit) {
				setPerPageLimit(limit);
			}
		};

		getPerPageLimitFromTauriStore();
	}, [perPageLimit, setPerPageLimit]);

	const searchQuery = useClipboardSearchQueryStore((state) => state.searchQuery);

	const isSearching = searchQuery.trim().length > 0;

	if (!data) {
		return <EmptyState isSearching={isSearching} />;
	}

	const clipboards = data.pages.flatMap((page) => page.items);

	return (
		<ul className="grid grid-cols-1 gap-3 px-4 pt-1 md:grid-cols-2">
			{clipboards.map((clipboard) => (
				<SortableClipboardItem key={clipboard.id} item={clipboard} />
			))}

			{hasNextPage && <InfiniteScrollSentinelListItem />}
		</ul>
	);
};
