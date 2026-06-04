import type { Hotkey } from '@tanstack/react-hotkeys';
import { formatForDisplay } from '@tanstack/react-hotkeys';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	getDefaultHotkeys,
	HOTKEY_ACTIONS,
	HOTKEY_META,
	type HotkeyAction,
	type HotkeyConfig,
} from '@/features/hotkey/hotkey-actions';

export function useHotkeysConfig() {
	const [hotkeys, setHotkeysState] = useState<HotkeyConfig>(getDefaultHotkeys);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoaded(true);
		})();
	}, []);

	const setHotkey = useCallback((action: HotkeyAction, hotkey: Hotkey) => {
		setHotkeysState((prev) => {
			const next = { ...prev, [action]: hotkey };
			return next;
		});
	}, []);

	const resetHotkey = useCallback(
		(action: HotkeyAction) => {
			setHotkey(action, HOTKEY_META[action].defaultKey);
		},
		[setHotkey],
	);

	const formatted = useMemo(
		() =>
			Object.fromEntries(HOTKEY_ACTIONS.map((a) => [a, formatForDisplay(hotkeys[a])])) as Record<
				HotkeyAction,
				string
			>,
		[hotkeys],
	);

	return { hotkeys, formatted, setHotkey, resetHotkey, isLoaded };
}
