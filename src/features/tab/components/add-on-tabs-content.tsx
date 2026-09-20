import { LineSquiggle, Smile, SquarePercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { load } from '@tauri-apps/plugin-store';
import { Tab } from '@/features/tab/hooks/use-tabs';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/features/clipboard/constant/query-key';

export function AddOnTabsContent() {
	const queryClient = useQueryClient();
	const onAddDrawingTab = async () => {
		const settingsStore = await load(import.meta.env.VITE_SETTINGS_FILE_NAME);

		const tabs = await settingsStore.get<Tab[]>('tabs');
		const drawingTabAlreadyExists = tabs?.find((tab) => tab.value === 'draw');
		if (drawingTabAlreadyExists) return;

		const newTabs = [
			...(tabs ?? []),
			{ icon: 'draw', label: 'Drawing', value: 'draw' },
		] satisfies Tab[];

		await settingsStore.set('tabs', newTabs);
		await settingsStore.save();

		await queryClient.invalidateQueries({
			queryKey: [QUERY_KEY.TABS],
		});
	};

	return (
		<TabsContent
			value="add-more-tab"
			className="flex flex-col overflow-hidden min-h-0 data-hidden:hidden"
		>
			<ul className="px-4 py-2 space-y-2">
				<li className="w-full">
					<Button
						variant="ghost"
						onClick={async () => {
							await onAddDrawingTab();
						}}
						className="cursor-pointer px-4 py-8 flex gap-2 w-full justify-start ring ring-accent"
					>
						<LineSquiggle className="size-6" />

						<div className="flex flex-col items-start">
							<div>Draw</div>
							<div className="text-sm text-muted-foreground">Create a new Excalidraw</div>
						</div>
					</Button>
				</li>

				<li className="w-full ">
					<Button
						variant="ghost"
						className="cursor-pointer px-4 py-8 flex gap-2 w-full justify-start ring ring-accent"
					>
						<SquarePercent className="size-6" />

						<div className="flex flex-col items-start">
							<div>Symbols</div>
							<div className="text-sm text-muted-foreground">Symbols picker</div>
						</div>
					</Button>
				</li>

				<li className="w-full">
					<Button
						variant="ghost"
						className="cursor-pointer px-4 py-8 flex gap-2 w-full justify-start ring ring-accent"
					>
						<Smile className="size-6" />

						<div className="flex flex-col items-start">
							<div>Emoji</div>
							<div className="text-sm text-muted-foreground">Symbols emojis</div>
						</div>
					</Button>
				</li>
			</ul>
		</TabsContent>
	);
}
