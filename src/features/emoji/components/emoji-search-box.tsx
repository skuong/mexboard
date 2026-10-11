import { useHotkey } from '@tanstack/react-hotkeys';
import { useDebouncedCallback } from '@tanstack/react-pacer';
import { type ComponentProps, useRef } from 'react';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { useEmojiSearchQueryStore } from '@/features/emoji/stores/emoji-search-query-store';
import { useHotkeysConfig } from '@/features/hotkey/hooks/use-hotkeys-config';
import { cn } from '@/utils/cn';

export function EmojiSearchBox({ className }: ComponentProps<'div'>) {
	const searchInputRef = useRef<HTMLInputElement>(null);
	const setSearchQuery = useEmojiSearchQueryStore((state) => state.setSearchQuery);
	const { hotkeys } = useHotkeysConfig();

	const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, {
		wait: 100,
	});

	useHotkey(
		hotkeys.search,
		() => searchInputRef.current?.focus(),
		{
			ignoreInputs: true,
		},
	);

	return (
		<div className={cn('relative size-full', className)}>
			<InputGroup className="border-none ring-2 ring-muted">
				<InputGroupInput
					ref={searchInputRef}
					type="search"
					placeholder="Search emoji…"
					aria-label="Search emoji"
					onChange={(event) => debouncedSetSearchQuery(event.target.value)}
				/>
			</InputGroup>
		</div>
	);
}
