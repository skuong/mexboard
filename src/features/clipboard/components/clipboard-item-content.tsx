import { platform } from '@tauri-apps/plugin-os';
import { useClipboardItem } from '@/features/clipboard/hooks/use-clipboard-item';

export function ClipboardItemContent() {
	const item = useClipboardItem();
	const previewSrc =
		platform() === 'windows'
			? `http://image.localhost/preview?id=${item.id}`
			: `image://localhost/preview?id=${item.id}`;

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
				<div className="w-full">
					<img src={previewSrc} alt="Preview of the clipboard content" className="mx-auto" />
				</div>
			)}
		</>
	);
}
