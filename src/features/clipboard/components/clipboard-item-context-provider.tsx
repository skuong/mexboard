import { PropsWithChildren } from "react";
import { ClipboardItemContext } from "@/features/clipboard/context/clipboard-item-context";
import { Clipboard } from "@/bindings";

export function ClipboardItemContextProvider({
  item,
  children,
}: PropsWithChildren<{
  item: Clipboard;
}>) {
  return (
    <ClipboardItemContext.Provider value={item}>
      {children}
    </ClipboardItemContext.Provider>
  );
}
