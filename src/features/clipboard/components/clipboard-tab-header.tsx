import { ClipboardFilters } from "@/types/clipboard";
import { SettingsSheet } from "@/features/preferences/components/settings-sheet";
import { ClipboardFilterMenu } from "@/components/clipboard-filter-menu";
import { ClipboardSearchBox } from "@/features/clipboard/components/clipboard-search-box";

type ClipboardHeaderProps = {
  filters: ClipboardFilters;
  onFiltersChange: (filters: ClipboardFilters) => void;
};

export const ClipboardTabHeader = ({
  filters,
  onFiltersChange,
}: ClipboardHeaderProps) => {
  return (
    <header className="flex items-center gap-2 px-4 pb-2 pt-1 group/header">
      <ClipboardSearchBox className="flex-1" />

      <ClipboardFilterMenu
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      <SettingsSheet />
    </header>
  );
};
