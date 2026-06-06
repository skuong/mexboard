import { useState } from 'react';
import { commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { authClient } from '@/features/auth/lib/better-auth-client';

export function ConnectToServerButton() {
	const { data: session } = authClient.useSession();

	const [isConnecting, setIsConnecting] = useState(false);
	const [isConnected, setIsConnected] = useState(false);

	const handleConnectWebsocket = async () => {
		setIsConnecting(true);

		const result = await commands.connectWebsocket(
			`${import.meta.env.VITE_WEBSOCKET_BASE_URL}/ws/${session?.session.userId}`,
			session?.session.token ?? '',
		);
		if (result.status === 'ok') {
			setIsConnected(true);
		} else {
			setIsConnected(false);
		}
		setIsConnecting(false);
	};

	const handleDisconnectWebsocket = async () => {
		const result = await commands.disconnectWebsocket();
		if (result.status === 'ok') {
			setIsConnected(false);
		}
	};

	if (!session) return null;

	return (
		<div className="flex flex-col gap-2">
			{!isConnected && (
				<Button disabled={isConnecting} onClick={handleConnectWebsocket}>
					Connect
				</Button>
			)}
			{isConnected && <Button onClick={handleDisconnectWebsocket}>Disconnect</Button>}
		</div>
	);
}
