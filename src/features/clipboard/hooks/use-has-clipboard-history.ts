import { useQuery } from '@tanstack/react-query';
import { commands } from '@/bindings';
import { QUERY_KEY } from '@/features/clipboard/constant/query-key';

export const useHasClipboardHistory = (): boolean => {
	const { data } = useQuery({
		queryKey: [QUERY_KEY.CLIPBOARDS, 'has-items'],
		queryFn: async () => {
			const result = await commands.getAllClipboardItems(1, 0);

			if (result.status === 'error') throw result.error;

			return result.data.total > 0;
		},
		refetchOnWindowFocus: true,
	});

	return data ?? false;
};
