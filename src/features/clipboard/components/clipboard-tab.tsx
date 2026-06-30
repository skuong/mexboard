import { ClipboardItemSkeletonList } from '@/components/clipboard-item-skeleton';
import { ClipboardList } from '@/features/clipboard/components/clipboard-list';
import { ClipboardTabHeader } from '@/features/clipboard/components/clipboard-tab-header';
import { useClipboardHistory } from '@/features/clipboard/hooks/use-clipboard-history';
import { useClipboardPerPageLimitStore } from '@/features/clipboard/stores/use-clipboard-per-page-limit-store';

export function ClipboardTab() {
	const perPageLimit = useClipboardPerPageLimitStore((state) => state.perPageLimit);
	const { isLoaded } = useClipboardHistory(perPageLimit, false);

	return (
		<>
			<ClipboardTabHeader />

			<div className="flex-1 overflow-y-auto">
				{!isLoaded ? <ClipboardItemSkeletonList /> : <ClipboardList />}
			</div>
		</>
	);
}
