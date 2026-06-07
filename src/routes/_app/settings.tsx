import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { SettingsSheetBody } from '@/features/preferences/components/settings-sheet-body';

export const Route = createFileRoute('/_app/settings')({
	component: SettingsModal,
});

function SettingsModal() {
	const navigate = useNavigate();

	return (
		<Sheet open onOpenChange={(open) => !open && navigate({ to: '/' })}>
			<SheetContent side="right" className="data-[side=right]:w-11/12 overflow-y-auto">
				<SheetHeader className="pb-2">
					<SheetTitle>Settings</SheetTitle>
					<SheetDescription className="sr-only">
						Configure clipboard monitoring, sync, and keyboard shortcuts.
					</SheetDescription>
				</SheetHeader>

				<SettingsSheetBody />
			</SheetContent>
		</Sheet>
	);
}
