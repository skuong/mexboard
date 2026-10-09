import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { commands } from '@/bindings';
import { QUERY_KEY } from '@/features/clipboard/constant/query-key';

export const useClearClipboardHistory = () => {
	const queryClient = useQueryClient();
	return useCallback(async () => {
		try {
			const result = await commands.clearClipboard();

			if (result.status === 'error') throw result.error;

			await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CLIPBOARDS] });
		} catch (err) {
			console.error('Failed to clear clipboard history:', err);
		}
	}, [queryClient]);
};
