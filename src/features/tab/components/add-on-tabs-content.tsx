import { LineSquiggle, Smile, SquarePercent } from 'lucide-react';
import { commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';

export function AddOnTabsContent() {
	return (
		<TabsContent
			value="add-more-tab"
			className="flex flex-col overflow-hidden min-h-0 data-hidden:hidden"
		>
			<ul className="px-4 py-2 space-y-2">
				<li className="w-full">
					<Button
						variant="ghost"
						onClick={() => {
							commands.openDrawWindow();
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
