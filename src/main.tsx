import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app';
import { authClient } from '@/features/auth/lib/better-auth-client';
import {
	authBearerTokenStore,
	useAuthBearerTokenStore,
} from '@/features/auth/stores/auth-bearer-token-store';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			retry: false,
		},
	},
});

useAuthBearerTokenStore.subscribe((state, prev) => {
	if (state.token !== prev.token) {
		void authClient.getSession();
	}
});

await authBearerTokenStore.hydrate();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
