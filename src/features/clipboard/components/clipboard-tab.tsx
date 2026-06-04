import { ClipboardList } from '@/components/clipboard-list';
import { ClipboardItemSkeletonList } from '@/components/clipboard-item-skeleton';
import { ClipboardTabHeader } from '@/features/clipboard/components/clipboard-tab-header';
import { useSettings } from '@/hooks/use-settings';
import { useClipboardHistory } from '@/features/clipboard/hooks/use-clipboard-history';

export function ClipboardTab() {
	const { historyLimit } = useSettings();
	const { isLoaded } = useClipboardHistory(historyLimit, false);

	return (
		<>
			<ClipboardTabHeader />

			<div className="flex-1 overflow-y-auto">
				{!isLoaded ? <ClipboardItemSkeletonList /> : <ClipboardList />}
			</div>
		</>
	);
}
