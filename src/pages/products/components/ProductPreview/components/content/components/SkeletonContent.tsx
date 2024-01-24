import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonContent() {
	return (
		<>
			<div className="mt-0 font-bold mb-2">
				<Skeleton className="h-6 w-96"></Skeleton>
			</div>
			<div className="text-xl flex items-center gap-2 mb-2 text-gray-950 dark:text-slate-100">
				category: <Skeleton className="h-5 w-36"></Skeleton>
			</div>
			<div className="text-xl flex items-center gap-2 mb-2 text-gray-950 dark:text-slate-100">
				price: <Skeleton className="h-5 w-36"></Skeleton>
			</div>
			<div className="text-xl flex items-center gap-2 mb-4 text-gray-950 dark:text-slate-100">
				stars: <Skeleton className="h-5 w-36"></Skeleton>
			</div>
			<div className="text-gray-900 mb-3 dark:text-slate-300">
				<Skeleton className="h-20 w-[30rem]"></Skeleton>
			</div>
			<Button
				aria-label="product preview content loading button"
				disabled
				className="w-full"
			>
				loading...
			</Button>
		</>
	);
}
