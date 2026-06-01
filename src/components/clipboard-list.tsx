import { EmptyState } from "@/components/clipboard-empty-state";
import { Button } from "@/components/ui/button";
import { ClipboardItemsGrid } from "@/components/clipboard-items-grid";
import { useClipboardSearchQueryStore } from "@/features/clipboard/stores/clipboard-search-query-store";
import { useClipboards } from "@/features/clipboard/hooks/use-clipboards";

export const ClipboardList = () => {
  const { data, hasNextPage, fetchNextPage } = useClipboards(5);

  const searchQuery = useClipboardSearchQueryStore(
    (state) => state.searchQuery,
  );

  const isSearching = searchQuery.trim().length > 0;

  if (!data) {
    return <EmptyState isSearching={isSearching} />;
  }

  const items = data.pages.flatMap((page) => page);

  const loadMoreButton = hasNextPage && (
    <li className="list-none">
      <Button
        variant="ghost"
        className="w-full text-muted-foreground"
        onClick={() => fetchNextPage()}
      >
        Load more
      </Button>
    </li>
  );

  return <ClipboardItemsGrid items={items} footer={loadMoreButton} />;
};
