import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { commands } from '@/bindings';
import type { Emoji } from '@/features/emoji/data/emoji-data';
import { useEmojiStore } from '@/features/emoji/stores/emoji-store';
import { cn } from '@/utils/cn';

export function EmojiItem({ emoji }: { emoji: Emoji }) {
	const [copied, setCopied] = useState(false);
	const addRecentEmoji = useEmojiStore((state) => state.addRecentEmoji);

	const handleClick = async () => {
		const result = await commands.pasteEmojiToOtherApp(emoji.char);
		if (result.status !== 'ok') return;

		addRecentEmoji(emoji.char);
		setCopied(true);
	};

	useEffect(() => {
		if (!copied) return;
		const timeout = setTimeout(() => setCopied(false), 800);
		return () => clearTimeout(timeout);
	}, [copied]);

	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<button
						type="button"
						aria-label={emoji.name}
						onClick={() => void handleClick()}
						className={cn(
							'flex aspect-square w-full items-center justify-center rounded-lg bg-muted/60 text-xl font-normal transition-all hover:bg-accent hover:text-accent-foreground active:scale-90 cursor-pointer select-none',
							copied && 'bg-green-500/15 text-green-600 dark:text-green-400',
						)}
					>
						<span aria-hidden="true">{emoji.char}</span>
					</button>
				}
			>
				<TooltipContent side="top">{emoji.name}</TooltipContent>
			</TooltipTrigger>
		</Tooltip>
	);
}
