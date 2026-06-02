import { SortableItem } from "./sortable-item";
import { Button } from "@/components/ui/button";
import { useClipboards } from "@/features/clipboard/hooks/use-clipboards";

type ClipboardItemsGridProps = {
  ariaLabel?: string;
};

export function ClipboardItemsGrid({ ariaLabel }: ClipboardItemsGridProps) {
  const { data, hasNextPage, fetchNextPage } = useClipboards(5);

  if (!data) return;

  const clipboards = data.pages.flatMap((page) => page.items);

  return (
    <ul
      className="grid grid-cols-1 gap-3 px-4 pt-1 md:grid-cols-2"
      role={ariaLabel ? "listbox" : undefined}
      aria-label={ariaLabel}
    >
      {clipboards.map((clipboard) => (
        <SortableItem key={clipboard.id} item={clipboard} />
      ))}

      {hasNextPage && (
        <li className="list-none">
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => fetchNextPage()}
          >
            Load more
          </Button>
        </li>
      )}
    </ul>
  );
}
