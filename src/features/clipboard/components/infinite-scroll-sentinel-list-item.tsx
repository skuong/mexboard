import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useClipboards } from '@/features/clipboard/hooks/use-clipboards';
import { useClipboardPerPageLimitStore } from '@/features/clipboard/stores/use-clipboard-per-page-limit-store';

export function InfiniteScrollSentinelListItem() {
	const perPageLimit = useClipboardPerPageLimitStore((state) => state.perPageLimit);
	const { hasNextPage, fetchNextPage, isFetchingNextPage } = useClipboards(perPageLimit);
	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<li ref={ref} className="list-none w-full text-center">
			Loading...
		</li>
	);
}
