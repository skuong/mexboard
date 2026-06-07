export const clipboardPerPageLimitOptions = (
	import.meta.env.VITE_CLIPBOARD_PER_PAGE_LIMIT_OPTIONS as string
)
	.split(',')
	.map(Number);
