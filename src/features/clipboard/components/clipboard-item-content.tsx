import { useClipboardItem } from '@/features/clipboard/hooks/use-clipboard-item';

export function ClipboardItemContent() {
	const item = useClipboardItem();

	return (
		<>
			{item.content && (
				<pre
					className={`whitespace-pre-wrap line-clamp-5 wrap-break-word text-card-foreground text-sm leading-relaxed font-[inherit]`}
				>
					{item.content}
				</pre>
			)}

			{!item.content && (
				<img
					src={`image://clipboards/preview?id=${item.id}`}
					alt="Preview of the clipboard content"
				/>
			)}
		</>
	);
}
