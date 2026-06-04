import { EmptyState } from '@/components/clipboard-empty-state';
import { ClipboardItemsGrid } from '@/components/clipboard-items-grid';
import { useClipboardSearchQueryStore } from '@/features/clipboard/stores/clipboard-search-query-store';
import { useClipboards } from '@/features/clipboard/hooks/use-clipboards';

export const ClipboardList = () => {
	const { data } = useClipboards(5);

	const searchQuery = useClipboardSearchQueryStore((state) => state.searchQuery);

	const isSearching = searchQuery.trim().length > 0;

	if (!data) {
		return <EmptyState isSearching={isSearching} />;
	}

	return <ClipboardItemsGrid />;
};
