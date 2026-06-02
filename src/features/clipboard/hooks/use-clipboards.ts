import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { QUERY_KEY } from "@/features/clipboard/constant/query-key";
import { commands, ClipboardsResponse } from "@/bindings";

export function useClipboards(limit: number) {
  return useInfiniteQuery<ClipboardsResponse, string, InfiniteData<ClipboardsResponse, number>, string[], number>({
    queryKey: [QUERY_KEY.CLIPBOARDS],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length * limit < lastPage.total ? allPages.length : undefined;
    },
    queryFn: async ({ pageParam }) => {
      const result = await commands.getAllClipboardItems(limit, pageParam * limit)

      if (result.status === "error") throw result.error;

      return result.data
    },
  })
}
