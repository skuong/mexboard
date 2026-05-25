import { SymbolsSearchBox } from "@/features/symbols/components/symbols-search-box";
import { SettingsSheet } from "@/features/preferences/components/settings-sheet";

export const SymbolsTabHeader = () => {
  return (
    <header className="flex items-center gap-2 px-4 pb-2 pt-1 group/header">
      <SymbolsSearchBox className="flex-1 min-w-0" />
      <SettingsSheet />
    </header>
  );
};
