import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SheetClose } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { useClearClipboardHistory } from '@/features/clipboard/hooks/use-clear-clipboard-history';
import { useHasClipboardHistory } from '@/features/clipboard/hooks/use-has-clipboard-history';
import { useClipboardMonitoringStore } from '@/features/clipboard/stores/clipboard-monitoring-store';
import { ClipboardPerPageLimitSetting } from '@/features/preferences/components/clipboard-per-page-limit-setting';

export function GeneralSettings() {
	const isMonitoring = useClipboardMonitoringStore((state) => state.isMonitoring);
	const toggleMonitoring = useClipboardMonitoringStore((state) => state.toggleMonitoring);
	const hasHistory = useHasClipboardHistory();
	const clearAll = useClearClipboardHistory();

	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center justify-between">
				<Label htmlFor="monitoring-clipboard" className="block space-y-1 cursor-pointer">
					<div>Monitoring</div>
					<div className="text-muted-foreground text-xs">{isMonitoring ? 'Active' : 'Paused'}</div>
				</Label>

				<Switch
					checked={isMonitoring}
					id="monitoring-clipboard"
					onCheckedChange={toggleMonitoring}
					className="cursor-pointer"
				/>
			</div>

			<div className="h-px bg-border/60 my-1" />

			<ClipboardPerPageLimitSetting />

			{hasHistory && (
				<>
					<div className="h-px bg-border/60 my-1" />
					<div className="py-2">
						<SheetClose
							render={
								<Button
									onClick={clearAll}
									variant="destructive"
									className="flex items-center gap-2 cursor-pointer"
								/>
							}
						>
							<Trash2 className="size-3.5" />
							Clear clipboard
						</SheetClose>
					</div>
				</>
			)}
		</div>
	);
}
