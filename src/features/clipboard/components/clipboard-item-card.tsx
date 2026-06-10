import { memo, useRef } from 'react';
import { commands } from '@/bindings';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardItemContent } from '@/features/clipboard/components/clipboard-item-content';
import { useClipboardItem } from '@/features/clipboard/hooks/use-clipboard-item';

export const ClipboardItemCard = memo(function ClipboardItem() {
	const cardRef = useRef<HTMLDivElement>(null);
	const item = useClipboardItem();

	return (
		<Card
			ref={cardRef}
			className="group py-2 ring-accent/80"
			onClick={async () => {
				await commands.writeClipboardItemToSystemClipboard(item.id);
			}}
		>
			<CardContent className="relative px-2 select-none">
				<ClipboardItemContent />
			</CardContent>
		</Card>
	);
});
