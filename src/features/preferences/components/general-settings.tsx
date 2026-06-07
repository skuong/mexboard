import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { useClearClipboardHistory } from '@/features/clipboard/hooks/use-clear-clipboard-history';
import { useHasClipboardHistory } from '@/features/clipboard/hooks/use-has-clipboard-history';
import { useClipboardMonitoringStore } from '@/features/clipboard/stores/clipboard-monitoring-store';
import { ClipboardPerPageLimitSetting } from '@/features/preferences/components/clipboard-per-page-limit-setting';
import { cn } from '@/lib/utils';
import { SettingRow } from '../setting-row';

export function GeneralSettings() {
	const isMonitoring = useClipboardMonitoringStore((state) => state.isMonitoring);
	const toggleMonitoring = useClipboardMonitoringStore((state) => state.toggleMonitoring);
	const hasHistory = useHasClipboardHistory();
	const clearAll = useClearClipboardHistory();

	return (
		<div className="flex flex-col gap-1">
			<SettingRow label="Monitoring" description={isMonitoring ? 'Active' : 'Paused'}>
				<Button
					onClick={toggleMonitoring}
					className={cn(
						'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors',
						isMonitoring ? 'bg-foreground' : 'bg-input border-border',
					)}
				>
					<span
						className={cn(
							'pointer-events-none block size-3.5 rounded-full shadow-sm transition-transform',
							isMonitoring ? 'translate-x-4 bg-background' : 'translate-x-0.5 bg-muted-foreground',
						)}
					/>
				</Button>
			</SettingRow>

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
