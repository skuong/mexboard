import { authClient } from "@/features/auth/lib/better-auth-client";
import { commands } from "@/bindings";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ConnectToServerButton() {
  const { data: session } = authClient.useSession();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleClick = async () => {
    setIsConnecting(true);

    const result = await commands.connectWebsocket(
      `${import.meta.env.VITE_WEBSOCKET_BASE_URL}/ws/${session?.session.userId}`,
      session?.session.token ?? "",
    );
    if (result.status === "ok") {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
    setIsConnecting(false);
  };

  if (!session) return null;

  return (
    <Button disabled={isConnecting || isConnected} onClick={handleClick}>
      {isConnected ? "Connected" : "Connect"}
    </Button>
  );
}
