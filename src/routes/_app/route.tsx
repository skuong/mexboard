import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import '@/main.css';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initializeBetterAuth } from '@/features/auth/lib/initialize-better-auth';
import { ClipboardTab } from '@/features/clipboard/components/clipboard-tab';
import { useContextMenu } from '@/features/context-menu/hooks/use-context-menu';
import { SymbolsTab } from '@/features/symbols/components/symbols-tab';
import { AddOnTabsContent } from '@/features/tab/components/add-on-tabs-content';
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

				<AddOnTabsContent />

				<div data-tauri-drag-region className="flex items-center gap-2 px-3 pb-3 select-none">
					<TabsList className="bg-transparent">
						{tabs.map((tab) => (
							<TabsTrigger key={tab.value} value={tab.value} className="cursor-pointer">
								<tab.icon />
							</TabsTrigger>
						))}

						<TabsTrigger key="add-more-tab" value="add-more-tab" className="cursor-pointer">
							<Plus className="text-muted-foreground" />
						</TabsTrigger>
					</TabsList>
				</div>
			</Tabs>

			<Outlet />
		</div>
	);
}
