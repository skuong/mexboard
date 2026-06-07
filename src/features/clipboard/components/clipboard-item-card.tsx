import { memo, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardItemContent } from '@/features/clipboard/components/clipboard-item-content';

export const ClipboardItemCard = memo(function ClipboardItem() {
	const cardRef = useRef<HTMLDivElement>(null);

	return (
		<Card ref={cardRef} className="group py-2 ring-accent/80">
			<CardContent className="relative px-2 select-none">
				<ClipboardItemContent />
			</CardContent>
		</Card>
	);
});
