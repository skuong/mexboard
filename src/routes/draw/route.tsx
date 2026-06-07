import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import { createFileRoute } from '@tanstack/react-router';
import { useTheme } from 'next-themes';

export const Route = createFileRoute('/draw')({
	component: RouteComponent,
});

function RouteComponent() {
	const { resolvedTheme } = useTheme();

	return (
		<div className="h-screen w-screen overflow-hidden">
			<Excalidraw theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
		</div>
	);
}
