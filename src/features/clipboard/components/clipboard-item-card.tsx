import { memo, useRef } from 'react';
import { ClipboardItemActions } from '@/components/clipboard-item-actions';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardItemContent } from '@/features/clipboard/components/clipboard-item-content';
import { useClipboardItem } from '@/features/clipboard/hooks/use-clipboard-item';

export const ClipboardItemCard = memo(function ClipboardItem() {
	const cardRef = useRef<HTMLDivElement>(null);

	const item = useClipboardItem();

	return (
		<Card ref={cardRef} className="gap-2 py-3 group relative">
			<CardContent className="flex items-start gap-2 px-1 relative">
				<div className="flex flex-col gap-1.5 flex-1 min-w-0 pl-2">
					<ClipboardItemContent />
				</div>

				<div className="flex flex-col items-center shrink-0">
					{item.is_favorite && <div className="size-1.5 rounded-full bg-amber-500/70 mb-0.5" />}
					<ClipboardItemActions />
				</div>
			</CardContent>
		</Card>
	);
});
