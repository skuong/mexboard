import { useSymbolsSearchQueryStore } from "@/features/symbols/stores/symbols-search-query-store";
import { useHotkey } from "@tanstack/react-hotkeys";
import { ComponentProps, useRef } from "react";
import { useHotkeysConfig } from "@/features/hotkey/hooks/use-hotkeys-config";
import { cn } from "@/utils/cn";
import { useTabs } from "@/features/tab/hooks/use-tabs";

import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { useDebouncedCallback } from "@tanstack/react-pacer";

export function SymbolsSearchBox({ className }: ComponentProps<"div">) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const focusSearch = () => {
    searchInputRef.current?.focus();
  };

  const { hotkeys } = useHotkeysConfig();
  const { activeTab } = useTabs();
  useHotkey(hotkeys.search, focusSearch, {
    enabled: activeTab === "symbols",
    ignoreInputs: true,
  });

  const setSearchQuery = useSymbolsSearchQueryStore(
    (state) => state.setSearchQuery,
  );

  const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, {
    wait: 100,
  });

  return (
    <div className={cn("relative size-full", className)}>
      <InputGroup className="border-none ring-2 ring-muted">
        <InputGroupInput
          ref={searchInputRef}
          type="search"
          placeholder="Search symbols…"
          aria-label="Search symbols"
          onChange={(event) => debouncedSetSearchQuery(event.target.value)}
        />
      </InputGroup>
    </div>
  );
}
