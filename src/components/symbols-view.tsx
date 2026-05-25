import { useMemo } from "react";
import { useSymbolsSearchQueryStore } from "@/features/symbols/stores/symbols-search-query-store";
import { SYMBOL_DATA } from "@/features/symbols/data/symbol-data";
import { SymbolsTabHeader } from "@/features/symbols/components/symbols-tab-header";
import { SymbolItem } from "@/features/symbols/components/symbol-item";

export const SymbolsTab = () => {
  const searchQuery = useSymbolsSearchQueryStore((state) => state.searchQuery);

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return SYMBOL_DATA;

    return SYMBOL_DATA.map((category) => ({
      ...category,
      symbols: category.symbols.filter(
        (symbol) =>
          symbol.name.toLowerCase().includes(query) || symbol.char === query,
      ),
    })).filter((cat) => cat.symbols.length > 0);
  }, [searchQuery]);

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <SymbolsTabHeader />

      <div className="flex-1 overflow-y-auto min-h-0 px-4 pb-4">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            No symbols found
          </div>
        ) : (
          filtered.map((category) => (
            <div key={category.label} className="mt-3 first:mt-1">
              <h3 className="text-[11px] font-medium text-muted-foreground mb-1.5 px-0.5">
                {category.label}
              </h3>

              <ul className="grid grid-cols-6 gap-1.5">
                {category.symbols.map((symbol) => {
                  return (
                    <li key={symbol.char + symbol.name} className="relative">
                      <SymbolItem symbol={symbol} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
