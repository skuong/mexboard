import { useEffect, useState } from "react";
import { useClipboard } from "@/hooks/use-clipboard";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";
import { Symbol } from "@/features/symbols/types/symbol";

export function SymbolItem({ symbol }: { symbol: Symbol }) {
  const [copied, setCopied] = useState<string | null>(null);

  const { writeTextToSystemClipboard } = useClipboard();
  const handleClick = (char: string) => {
    writeTextToSystemClipboard(char);
    setCopied(char);
  };

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 800);
    return () => clearTimeout(t);
  }, [copied]);

  return (
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
        <span className="text-base leading-none">{symbol.char}</span>
      </TooltipTrigger>

      <TooltipContent side="top">{symbol.name}</TooltipContent>
    </Tooltip>
  );
}
