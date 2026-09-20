import { useHotkey } from '@tanstack/react-hotkeys';
import { useEffect, useState } from 'react';
import { useHotkeysConfig } from '@/features/hotkey/hooks/use-hotkeys-config';
import { load } from '@tauri-apps/plugin-store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/features/clipboard/constant/query-key';

export type Tab = {
	label: string;
	value: 'clipboard' | 'draw';
	icon: 'copy' | 'draw';
};

export function useTabs() {
	const queryClient = useQueryClient();
	const [tabOrder, setTabOrder] = useState(['clipboard']);
	const [activeTab, setActiveTab] = useState<(typeof tabOrder)[number]>('clipboard');

	const { hotkeys } = useHotkeysConfig();

	const { data: tabs } = useQuery({
		queryKey: [QUERY_KEY.TABS],
		queryFn: async () => {
			const settingsStore = await load(import.meta.env.VITE_SETTINGS_FILE_NAME);
			const tabs = await settingsStore.get<Tab[]>('tabs');
			return tabs ?? [];
		},
	});

	useEffect(() => {
		const setInitialTab = async () => {
			const settingsStore = await load(import.meta.env.VITE_SETTINGS_FILE_NAME);

			await settingsStore.set('tabs', [
				{ icon: 'copy', label: 'Clipboard', value: 'clipboard' },
			] satisfies Tab[]);
			await settingsStore.save();

			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.TABS],
			});
		};
		if (tabs?.length === 0) setInitialTab();

		const newTabOrder = tabs?.map((tab) => tab.value);
		if (newTabOrder) setTabOrder(newTabOrder);
	}, [tabs]);

	useHotkey(
		hotkeys.cycleTabs,
		() => {
			setActiveTab((previousTab) => {
				const previousTabIndex = tabOrder.indexOf(previousTab);
				return tabOrder[(previousTabIndex + 1) % tabOrder.length];
			});
		},
		{ ignoreInputs: true },
	);

	if (tabs?.length) {
		return {
			activeTab,
			setActiveTab,
			tabs,
		};
	} else {
		return {
			activeTab,
			setActiveTab,
			tabs: [
				{
					label: 'Clipboard',
					value: 'clipboard',
					icon: 'copy',
				},
			] satisfies Tab[],
		};
	}
}
