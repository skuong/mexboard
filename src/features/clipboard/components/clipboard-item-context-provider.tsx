import { PropsWithChildren } from "react";
import type { ClipboardItem } from "@/types/clipboard";
import { ClipboardItemContext } from "@/features/clipboard/context/clipboard-item-context";

export function ClipboardItemContextProvider({
  item,
  children,
}: PropsWithChildren<{
  item: ClipboardItem;
}>) {
  return (
    <ClipboardItemContext.Provider value={item}>
      {children}
    </ClipboardItemContext.Provider>
  );
}
