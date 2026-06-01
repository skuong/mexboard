import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/features/clipboard/constant/query-key";
import { commands } from "@/bindings";

export function useClipboards(limit: number) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.CLIPBOARDS],
    initialPageParam: 0,
    getNextPageParam: () => undefined /*todo */,
    getPreviousPageParam: () => {
      return undefined /*todo */
    },
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      const result = await commands.getAllClipboardItems(limit, pageParam * limit)

      if (result.status === "error") throw result.error;

      return result.data
    },
  })
}
