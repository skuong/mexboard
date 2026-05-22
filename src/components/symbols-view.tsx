import { useEffect, useMemo, useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { SymbolsSearchBox } from "@/features/symbols/components/symbols-search-box";
import { useSymbolsSearchQueryStore } from "@/features/symbols/stores/symbols-search-query-store";
import { SYMBOL_DATA } from "@/lib/symbol-data";
import { cn } from "@/utils/cn";

type SymbolsViewProps = {
  onSelect: (char: string) => void;
  isActive?: boolean;
};

export const SymbolsView = ({
  onSelect,
  isActive = true,
}: SymbolsViewProps) => {
  const searchQuery = useSymbolsSearchQueryStore((state) => state.searchQuery);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SYMBOL_DATA;

    return SYMBOL_DATA.map((cat) => ({
      ...cat,
      symbols: cat.symbols.filter(
        (s) => s.name.toLowerCase().includes(q) || s.char === q,
      ),
    })).filter((cat) => cat.symbols.length > 0);
  }, [searchQuery]);

  const [copied, setCopied] = useState<string | null>(null);

  const handleClick = (char: string) => {
    onSelect(char);
    setCopied(char);
  };

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 800);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <div className="px-4 py-1">
        <SymbolsSearchBox className="flex-1 min-w-0" isActive={isActive} />
      </div>

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

              <div className="grid grid-cols-6 gap-1.5">
                {category.symbols.map((symbol) => {
                  return (
                    <div key={symbol.char + symbol.name} className="relative">
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <button
                              type="button"
                              aria-label={symbol.name}
                              onClick={() => handleClick(symbol.char)}
                              className={cn(
                                "flex w-full items-center justify-center bg-muted/60 rounded-lg aspect-square font-normal transition-all cursor-pointer select-none hover:bg-accent hover:text-accent-foreground active:scale-90",
                                copied === symbol.char &&
                                  "bg-green-500/15 text-green-600 dark:text-green-400",
                              )}
                            />
                          }
                        >
                          <span className="text-base leading-none">
                            {symbol.char}
                          </span>
                        </TooltipTrigger>

                        <TooltipContent side="top">
                          {symbol.name}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
