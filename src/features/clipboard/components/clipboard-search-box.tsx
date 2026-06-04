import { useHotkey } from '@tanstack/react-hotkeys';
import { useDebouncedCallback } from '@tanstack/react-pacer';
import { type ComponentProps, useRef } from 'react';
import { ClipboardFilterMenu } from '@/components/clipboard-filter-menu';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useClipboardSearchQueryStore } from '@/features/clipboard/stores/clipboard-search-query-store';
import { useHotkeysConfig } from '@/features/hotkey/hooks/use-hotkeys-config';
import { cn } from '@/utils/cn';

export function ClipboardSearchBox({ className }: ComponentProps<'div'>) {
	const searchInputRef = useRef<HTMLInputElement>(null);
	const focusSearch = () => {
		searchInputRef.current?.focus();
	};

	const { hotkeys } = useHotkeysConfig();
	useHotkey(hotkeys.search, focusSearch, {
		ignoreInputs: true,
	});

	const setSearchQuery = useClipboardSearchQueryStore((state) => state.setSearchQuery);

	const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, {
		wait: 100,
	});

	return (
		<div className={cn('relative size-full', className)}>
			<InputGroup className="border-none ring-2 ring-muted">
				<InputGroupInput
					ref={searchInputRef}
					type="search"
					placeholder="Search clipboard…"
					aria-label="Search clipboard history"
					onChange={(event) => debouncedSetSearchQuery(event.target.value)}
				/>

				<InputGroupAddon align="inline-end">
					<ClipboardFilterMenu />
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}
