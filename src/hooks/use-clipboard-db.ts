import { commands, InsertClipboardItemParams, UpdateSortOrderParams } from "@/bindings";
import { ClipboardItem } from "@/types/clipboard";

async function unwrap<T>(
  p: Promise<{ status: "ok"; data: T } | { status: "error"; error: string }>,
): Promise<T> {
  const r = await p;
  if (r.status === "error") throw r.error;
  return r.data;
}

export const clipboardDb = {
  getAllItems: (limit: number, offset = 0, favoritesFirst = false) =>
    unwrap(commands.getAllClipboardItems(limit, offset, favoritesFirst)) as Promise<
      ClipboardItem[]
    >,

  insertItem: (params: InsertClipboardItemParams) =>
    unwrap(commands.insertClipboardItem(params)) as Promise<ClipboardItem>,

  bumpItem: (id: number, sortOrder: string) =>
    unwrap(commands.bumpClipboardItem(id, sortOrder)) as Promise<ClipboardItem>,

  deleteItem: (id: number) => unwrap(commands.deleteClipboardItem(id)),

  clearAll: () => unwrap(commands.clearClipboard()),

  toggleFavorite: (id: number) =>
    unwrap(commands.toggleClipboardItemFavorite(id)) as Promise<ClipboardItem>,

  updateSortOrders: (items: UpdateSortOrderParams[]) =>
    unwrap(commands.updateClipboardSortOrder(items)),

  dedupItem: (id: number) => unwrap(commands.dedupClipboardItem(id)),

  updateNote: (id: number, note: string | null) =>
    unwrap(commands.updateClipboardItemNote(id, note)) as Promise<ClipboardItem>,
};
