import { createContext } from "react";
import type { ClipboardItem } from "@/types/clipboard";

export const ClipboardItemContext = createContext<ClipboardItem | undefined>(undefined);
