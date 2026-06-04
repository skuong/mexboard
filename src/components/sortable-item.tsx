import { memo } from 'react';

import { ClipboardItemCard } from '@/features/clipboard/components/clipboard-item-card';
import { ClipboardItemContextProvider } from '@/features/clipboard/components/clipboard-item-context-provider';
import { Clipboard } from '@/bindings';

export const SortableItem = memo(function SortableItem({ item }: { item: Clipboard }) {
	return (
		<ClipboardItemContextProvider item={item}>
			<ClipboardItemCard />
		</ClipboardItemContextProvider>
	);
});
