import type { PropsWithChildren } from 'react';
import type { Clipboard } from '@/bindings';
import { ClipboardItemContext } from '@/features/clipboard/context/clipboard-item-context';

export function ClipboardItemContextProvider({
	item,
	children,
}: PropsWithChildren<{
	item: Clipboard;
}>) {
	return <ClipboardItemContext.Provider value={item}>{children}</ClipboardItemContext.Provider>;
}
