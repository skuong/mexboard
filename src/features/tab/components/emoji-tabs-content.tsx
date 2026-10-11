import { useEffect, useMemo } from 'react';
import { SettingsSheet } from '@/features/preferences/components/settings-sheet';
import { EmojiItem } from '@/features/emoji/components/emoji-item';
import { EmojiSearchBox } from '@/features/emoji/components/emoji-search-box';
import { EMOJI_CATEGORIES, type Emoji } from '@/features/emoji/data/emoji-data';
import { useEmojiSearchQueryStore } from '@/features/emoji/stores/emoji-search-query-store';
import { useEmojiStore } from '@/features/emoji/stores/emoji-store';
import { TabsContent } from '@/components/ui/tabs';

export function EmojiTabsContent() {
	const searchQuery = useEmojiSearchQueryStore((state) => state.searchQuery);
	const recentEmojis = useEmojiStore((state) => state.recentEmojis);
	const hydrateRecentEmojis = useEmojiStore((state) => state.hydrateRecentEmojis);

	useEffect(() => {
		void hydrateRecentEmojis();
	}, [hydrateRecentEmojis]);

	const query = searchQuery.trim().toLocaleLowerCase();
	const filteredCategories = useMemo(() => {
		if (!query) return EMOJI_CATEGORIES;

		return EMOJI_CATEGORIES.map((category) => ({
			...category,
			emojis: category.emojis.filter((emoji) =>
				[emoji.char, emoji.name, ...emoji.keywords].some((value) =>
					value.toLocaleLowerCase().includes(query),
				),
			),
		})).filter((category) => category.emojis.length > 0);
	}, [query]);

	const emojiByCharacter = useMemo(
		() =>
			new Map(
				EMOJI_CATEGORIES.flatMap((category) =>
					category.emojis.map((emoji) => [emoji.char, emoji] as const),
				),
			),
		[],
	);

	const displayedRecentEmojis: Emoji[] = recentEmojis
		.map((emoji) => emojiByCharacter.get(emoji))
		.filter((emoji): emoji is Emoji => emoji !== undefined);

	return (
		<TabsContent value="emoji" className="flex min-h-0 flex-col overflow-hidden data-hidden:hidden">
			<header className="flex items-center gap-2 px-4 pb-2 pt-1">
				<EmojiSearchBox className="flex-1 min-w-0" />
				<SettingsSheet />
			</header>

			<div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
				{!query && displayedRecentEmojis.length > 0 && (
					<EmojiCategorySection label="Recently used" emojis={displayedRecentEmojis} />
				)}

				{filteredCategories.length === 0 ? (
					<div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
						No emoji found
					</div>
				) : (
					filteredCategories.map((category) => (
						<EmojiCategorySection
							key={category.label}
							label={category.label}
							emojis={category.emojis}
						/>
					))
				)}
			</div>
		</TabsContent>
	);
}

function EmojiCategorySection({ label, emojis }: { label: string; emojis: Emoji[] }) {
	return (
		<section className="mt-3 first:mt-1" aria-label={label}>
			<h2 className="mb-1.5 px-0.5 text-[11px] font-medium text-muted-foreground">{label}</h2>
			<ul className="grid grid-cols-6 gap-1.5">
				{emojis.map((emoji, index) => (
					<li key={emoji.char + label + index}>
						<EmojiItem emoji={emoji} />
					</li>
				))}
			</ul>
		</section>
	);
}
