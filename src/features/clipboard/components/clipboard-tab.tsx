import { ClipboardItemSkeletonList } from '@/components/clipboard-item-skeleton';
import { ClipboardList } from '@/components/clipboard-list';
import { ClipboardTabHeader } from '@/features/clipboard/components/clipboard-tab-header';
import { useClipboardHistory } from '@/features/clipboard/hooks/use-clipboard-history';
import { useSettings } from '@/hooks/use-settings';

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
