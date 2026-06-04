import { useHotkey } from '@tanstack/react-hotkeys';
import { useDebouncedCallback } from '@tanstack/react-pacer';
import { type ComponentProps, useRef } from 'react';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { useHotkeysConfig } from '@/features/hotkey/hooks/use-hotkeys-config';
import { useSymbolsSearchQueryStore } from '@/features/symbols/stores/symbols-search-query-store';
import { useTabs } from '@/features/tab/hooks/use-tabs';
import { cn } from '@/utils/cn';

export function SymbolsSearchBox({ className }: ComponentProps<'div'>) {
	const searchInputRef = useRef<HTMLInputElement>(null);
	const focusSearch = () => {
		searchInputRef.current?.focus();
	};

	const { hotkeys } = useHotkeysConfig();
	const { activeTab } = useTabs();
	useHotkey(hotkeys.search, focusSearch, {
		enabled: activeTab === 'symbols',
		ignoreInputs: true,
	});

	const setSearchQuery = useSymbolsSearchQueryStore((state) => state.setSearchQuery);

	const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, {
		wait: 100,
	});

	return (
		<div className={cn('relative size-full', className)}>
			<InputGroup className="border-none ring-2 ring-muted">
				<InputGroupInput
					ref={searchInputRef}
					type="search"
					placeholder="Search symbols…"
					aria-label="Search symbols"
					onChange={(event) => debouncedSetSearchQuery(event.target.value)}
				/>
			</InputGroup>
		</div>
	);
}
