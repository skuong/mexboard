import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useClipboardItem } from "../hooks/use-clipboard-item";

const CollapsibleText = ({ text }: { text: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = preRef.current;
    if (el) {
      setIsClamped(el.scrollHeight > el.clientHeight);
    }
  }, [text]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <pre
        ref={preRef}
        className={`whitespace-pre-wrap wrap-break-word text-card-foreground text-sm leading-relaxed font-[inherit] ${
          !isOpen ? "line-clamp-6" : ""
        }`}
      >
        {text}
      </pre>
      {isClamped && (
        <CollapsibleTrigger className="flex items-center gap-0.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer mt-0.5">
          <ChevronDown
            className={`size-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
          {isOpen ? "Show less" : "Show more"}
        </CollapsibleTrigger>
      )}
      <CollapsibleContent />
    </Collapsible>
  );
};

export function ClipboardItemContent() {
  const item = useClipboardItem();
  return <CollapsibleText text={item.content || ""} />;
}
