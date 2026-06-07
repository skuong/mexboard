import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { type ClipboardsResponse, commands } from '@/bindings';
import { QUERY_KEY } from '@/features/clipboard/constant/query-key';

export function useClipboards(limit: number) {
	return useInfiniteQuery<
		ClipboardsResponse,
		string,
		InfiniteData<ClipboardsResponse, number>,
		string[],
		number
	>({
		queryKey: [QUERY_KEY.CLIPBOARDS, limit.toString()],
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			return allPages.length * limit < lastPage.total ? allPages.length : undefined;
		},
		queryFn: async ({ pageParam }) => {
			const result = await commands.getAllClipboardItems(limit, pageParam * limit);

			if (result.status === 'error') throw result.error;

			return result.data;
		},
		enabled: !!limit,
	});
}
