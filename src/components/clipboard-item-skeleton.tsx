import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SingleSkeleton = () => (
	<Card className="gap-2 py-3">
		<CardContent className="flex items-start gap-2 px-1">
			<div className="flex flex-col gap-2 flex-1 pl-2">
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-3 w-1/3" />
			</div>
			<div className="flex flex-col gap-1 shrink-0 pt-0.5">
				<Skeleton className="size-6 rounded-md" />
				<Skeleton className="size-6 rounded-md" />
			</div>
		</CardContent>
	</Card>
);

export const ClipboardItemSkeletonList = ({ count = 6 }: { count?: number }) => (
	<ul className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2">
		{Array.from({ length: count }, (_, i) => (
			<li key={i} className="list-none">
				<SingleSkeleton />
			</li>
		))}
	</ul>
);
