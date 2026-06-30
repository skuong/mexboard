import { useQueryClient } from '@tanstack/react-query';
import { memo, useRef } from 'react';
import { commands } from '@/bindings';
import { Card, CardContent } from '@/components/ui/card';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { ClipboardItemContent } from '@/features/clipboard/components/clipboard-item-content';
import { QUERY_KEY } from '@/features/clipboard/constant/query-key';
import { useClipboardItem } from '@/features/clipboard/hooks/use-clipboard-item';

export const ClipboardItemCard = memo(function ClipboardItem() {
	const queryClient = useQueryClient();

	const cardRef = useRef<HTMLDivElement>(null);
	const item = useClipboardItem();

	return (
		<Card
			ref={cardRef}
			className="group py-2 ring-accent/80"
			onClick={async () => {
				await commands.writeClipboardItemToSystemClipboard(item.id);
			}}
			onDoubleClick={async () => {
				commands.pasteClipboardToOtherApp(item.id);
			}}
		>
			<ContextMenu>
				<ContextMenuTrigger className="w-full h-full">
					<CardContent className="relative px-2 select-none">
						<ClipboardItemContent />
					</CardContent>
				</ContextMenuTrigger>

				<ContextMenuContent>
					<ContextMenuGroup>
						<ContextMenuItem
							onClick={async () => {
								const { status } = await commands.writeClipboardItemToSystemClipboard(item.id);
								if (status === 'ok') {
									queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CLIPBOARDS] });
								}
							}}
							className="cursor-pointer"
						>
							Copy
						</ContextMenuItem>

						<ContextMenuItem
							onClick={async () => {
								const { status } = await commands.deleteClipboardItem(item.id);
								if (status === 'ok') {
									queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CLIPBOARDS] });
								}
							}}
							className="cursor-pointer"
						>
							Delete
						</ContextMenuItem>
					</ContextMenuGroup>
				</ContextMenuContent>
			</ContextMenu>
		</Card>
	);
});
