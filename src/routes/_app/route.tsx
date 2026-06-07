import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import '@/main.css';
import { Plus } from 'lucide-react';
import { commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initializeBetterAuth } from '@/features/auth/lib/initialize-better-auth';
import { ClipboardTab } from '@/features/clipboard/components/clipboard-tab';
import { useContextMenu } from '@/features/context-menu/hooks/use-context-menu';
import { SymbolsTab } from '@/features/symbols/components/symbols-tab';
import { useTabs } from '@/features/tab/hooks/use-tabs';
import { useSystemTheme } from '@/hooks/use-system-theme';

export const Route = createFileRoute('/_app')({
	component: RouteComponent,
});

function RouteComponent() {
	useSystemTheme();
	const { tabs, activeTab, setActiveTab } = useTabs();

	useEffect(() => {
		return initializeBetterAuth();
	}, []);

	useContextMenu();
	return (
		<div className="h-full relative">
			<Tabs
				value={activeTab}
				onValueChange={(tab) => setActiveTab(tab)}
				className="h-full overflow-hidden bg-background text-foreground pt-3"
			>
				<TabsContent
					value="clipboard"
					keepMounted
					className="flex flex-col overflow-hidden min-h-0 data-hidden:hidden"
				>
					<ClipboardTab />
				</TabsContent>

				<TabsContent
					value="symbols"
					keepMounted
					className="flex flex-col overflow-hidden min-h-0 data-hidden:hidden"
				>
					<SymbolsTab />
				</TabsContent>

				<TabsContent
					value="add-more-tab"
					className="flex flex-col overflow-hidden min-h-0 data-hidden:hidden"
				>
					<ul>
						{[1, 2, 3, 4, 5].map((range) => (
							<li key={range} className="w-full py-2">
								Feature {range}
							</li>
						))}
					</ul>
				</TabsContent>

				<div data-tauri-drag-region className="flex items-center gap-2 px-3 pb-3 select-none">
					<TabsList className="bg-transparent">
						{tabs.map((tab) => (
							<TabsTrigger key={tab.value} value={tab.value} className="cursor-pointer">
								<tab.icon />
							</TabsTrigger>
						))}

						<Button
							variant="link"
							onClick={() => {
								commands.openDrawWindow();
							}}
							className="cursor-pointer"
						>
							<Plus className="text-muted-foreground" />
						</Button>
					</TabsList>
				</div>
			</Tabs>

			<Outlet />
		</div>
	);
}
