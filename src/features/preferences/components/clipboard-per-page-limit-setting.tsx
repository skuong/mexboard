import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { clipboardPerPageLimitOptions } from '@/features/clipboard/constant/clipboard-per-page-limit-options';
import { useClipboardPerPageLimitStore } from '@/features/clipboard/stores/use-clipboard-per-page-limit-store';

export function ClipboardPerPageLimitSetting() {
	const { perPageLimit, setPerPageLimit } = useClipboardPerPageLimitStore();

	return (
		<div className="py-2">
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm font-medium text-foreground">Page limit</span>
			</div>

			<ToggleGroup
				variant="outline"
				size="sm"
				value={[String(perPageLimit)]}
				onValueChange={(value) => {
					if (value.length > 0) setPerPageLimit(Number(value[value.length - 1]));
				}}
				className="w-full"
			>
				{clipboardPerPageLimitOptions.map((option) => (
					<ToggleGroupItem
						key={option}
						value={String(option)}
						className="flex-1 text-xs cursor-pointer"
					>
						{option}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
}
