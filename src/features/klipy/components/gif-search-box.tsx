import { useHotkey } from '@tanstack/react-hotkeys';
import { useDebouncedCallback } from '@tanstack/react-pacer';
import { Search } from 'lucide-react';
import { type ComponentProps, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { useHotkeysConfig } from '@/features/hotkey/hooks/use-hotkeys-config';
import { useGifSearchQueryStore } from '@/features/klipy/stores/gif-search-query-store';
import { cn } from '@/utils/cn';

type GifSearchBoxProps = ComponentProps<'div'> & {
	isActive?: boolean;
};

export function GifSearchBox({ className, isActive = true }: GifSearchBoxProps) {
	const ref = useRef<HTMLInputElement>(null);

	const setSearchQuery = useGifSearchQueryStore((state) => state.setSearchQuery);

	const { hotkeys } = useHotkeysConfig();

	const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, {
		wait: 300,
	});

	const focusSearch = () => {
		ref.current?.focus();
	};

	useHotkey(hotkeys.search, focusSearch, {
		enabled: isActive,
		ignoreInputs: true,
	});

	return (
		<div className={cn('relative size-full', className)}>
			<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />

			<Input
				ref={ref}
				type="search"
				placeholder="Search KLIPY…"
				aria-label="Search KLIPY"
				onChange={(event) => debouncedSetSearchQuery(event.target.value)}
				className="pl-8 h-10 border-none ring-2 ring-muted"
			/>
		</div>
	);
}
