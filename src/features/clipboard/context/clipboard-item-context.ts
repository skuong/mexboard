import { createContext } from 'react';
import { Clipboard } from '@/bindings';

export const ClipboardItemContext = createContext<Clipboard | undefined>(undefined);
