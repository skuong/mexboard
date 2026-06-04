import { useContext } from 'react';
import { ClipboardItemContext } from '@/features/clipboard/context/clipboard-item-context';

export function useClipboardItem() {
	const context = useContext(ClipboardItemContext);

	if (context === undefined) {
		throw new Error('useClipboardItem must be used within a ClipboardItemProvider');
	}

	return context;
}
