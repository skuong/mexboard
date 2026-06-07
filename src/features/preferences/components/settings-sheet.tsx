import { Link } from '@tanstack/react-router';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SettingsSheet() {
	return (
		<Link to="/settings">
			<Button
				variant="ghost"
				size="icon-sm"
				className="text-neutral-400 dark:text-neutral-600 cursor-pointer"
			>
				<Settings2 className="size-5" />
			</Button>
		</Link>
	);
}
