import { createContext } from 'react';
import type { Clipboard } from '@/bindings';

export const ClipboardItemContext = createContext<Clipboard | undefined>(undefined);
