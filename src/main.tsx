import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { createHashHistory, createRouter, RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { authClient } from '@/features/auth/lib/better-auth-client';
import {
	authBearerTokenStore,
	useAuthBearerTokenStore,
} from '@/features/auth/stores/auth-bearer-token-store';
import { getCurrentWindow } from '@tauri-apps/api/window';

import { routeTree } from './routeTree.gen';
import { UnlistenFn } from '@tauri-apps/api/event';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			retry: false,
		},
	},
});

focusManager.setEventListener((handleFocus) => {
	let unlisten: UnlistenFn | undefined;

	getCurrentWindow()
		.onFocusChanged(({ payload: focused }) => handleFocus(focused))
		.then((fn) => (unlisten = fn));

	return () => unlisten?.();
});

useAuthBearerTokenStore.subscribe((state, prev) => {
	if (state.token !== prev.token) {
		void authClient.getSession();
	}
});

await authBearerTokenStore.hydrate();

const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
