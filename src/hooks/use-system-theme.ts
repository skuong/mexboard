import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export function useSystemTheme() {
	const { setTheme } = useTheme();

	useEffect(() => {
		const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		setTheme(colorSchemeMediaQuery.matches ? 'dark' : 'light');

		const onPreferColorSchemeChange = (mediaQueryChangeEvent: MediaQueryListEvent) => {
			setTheme(mediaQueryChangeEvent.matches ? 'dark' : 'light');
		};

		colorSchemeMediaQuery.addEventListener('change', onPreferColorSchemeChange);

		return () => colorSchemeMediaQuery.removeEventListener('change', onPreferColorSchemeChange);
	}, [setTheme]);
}
