import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { MexboardSymbol } from '@/features/symbols/types/symbol';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/utils/cn';

export function SymbolItem({ symbol }: { symbol: MexboardSymbol }) {
	const [copied, setCopied] = useState<string | null>(null);

	const { writeTextToSystemClipboard } = useClipboard();
	const handleClick = (char: string) => {
		writeTextToSystemClipboard(char);
		setCopied(char);
	};

	useEffect(() => {
		if (!copied) return;
		const t = setTimeout(() => setCopied(null), 800);
		return () => clearTimeout(t);
	}, [copied]);

	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<button
						type="button"
						aria-label={symbol.name}
						onClick={() => handleClick(symbol.char)}
						className={cn(
							'flex w-full items-center justify-center bg-muted/60 rounded-lg aspect-square font-normal transition-all cursor-pointer select-none hover:bg-accent hover:text-accent-foreground active:scale-90',
							copied === symbol.char && 'bg-green-500/15 text-green-600 dark:text-green-400',
						)}
					/>
				}
			>
				<span className="text-base leading-none">{symbol.char}</span>
			</TooltipTrigger>

			<TooltipContent side="top">{symbol.name}</TooltipContent>
		</Tooltip>
	);
}
