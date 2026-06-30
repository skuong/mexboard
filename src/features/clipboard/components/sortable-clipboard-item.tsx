import { memo } from 'react';
import type { Clipboard } from '@/bindings';
import { ClipboardItemCard } from '@/features/clipboard/components/clipboard-item-card';
import { ClipboardItemContextProvider } from '@/features/clipboard/components/clipboard-item-context-provider';

export const SortableClipboardItem = memo(function SortableItem({ item }: { item: Clipboard }) {
	return (
		<ClipboardItemContextProvider item={item}>
			<ClipboardItemCard />
		</ClipboardItemContextProvider>
	);
});
