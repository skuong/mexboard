import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/utils/cn";
import { ComponentProps, useState } from "react";
import { useClipboardItem } from "@/features/clipboard/hooks/use-clipboard-item";
import { useClipboard } from "@/hooks/use-clipboard";

export function CopyToClipboardButton({
  className,
}: ComponentProps<typeof Button>) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const clipboard = useClipboardItem();
  const { writeImageToSystemClipboard, writeTextToSystemClipboard } =
    useClipboard();

  const onCopy = async () => {
    if (clipboard.content_type === "text" && clipboard.text_content) {
      await writeTextToSystemClipboard(clipboard.text_content);
      setIsCopied(true);
    } else if (clipboard.content_type === "image" && clipboard.image_data) {
      await writeImageToSystemClipboard(clipboard.image_data);
      setIsCopied(true);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={onCopy}
      className={cn(
        "text-neutral-400 dark:text-neutral-600 dark:hover:text-foreground hover:text-foreground cursor-pointer",
        className,
      )}
    >
      {isCopied && <Check className="size-3.5" />}
      {!isCopied && <Copy className="size-3.5" />}
    </Button>
  );
}
