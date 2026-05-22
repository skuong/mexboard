import { Trash2, SplitSquareHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { CopyToClipboardButton } from "@/features/clipboard/components/copy-to-clipboard-button";

type ClipboardItemActionsProps = {
  isCopied: boolean;
  onDelete: () => void;
  onSplitEnv?: () => void;
  showSplit: boolean;
};

export const ClipboardItemActions = ({
  isCopied,
  onDelete,
  onSplitEnv,
  showSplit,
}: ClipboardItemActionsProps) => {
  return (
    <div className="flex invisible group-hover:visible flex-col items-center gap-0.5 shrink-0 pt-0.5">
      <Tooltip>
        <TooltipTrigger render={<CopyToClipboardButton />}></TooltipTrigger>

        <TooltipContent className="pointer-events-none">
          {isCopied ? "Currently in clipboard" : "Copy to clipboard"}
        </TooltipContent>
      </Tooltip>

      {showSplit && onSplitEnv && (
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={onSplitEnv}
                className="text-neutral-400 dark:text-neutral-600 dark:hover:text-foreground hover:text-foreground cursor-pointer"
              />
            }
          >
            <SplitSquareHorizontal className="size-3.5" />
          </TooltipTrigger>
          <TooltipContent className="pointer-events-none">
            Split into key-value items
          </TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onDelete}
              className="text-neutral-400 dark:text-neutral-600 dark:hover:text-foreground hover:text-foreground cursor-pointer"
            />
          }
        >
          <Trash2 className="size-3.5" />
        </TooltipTrigger>
        <TooltipContent className="pointer-events-none">
          Delete from history
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
