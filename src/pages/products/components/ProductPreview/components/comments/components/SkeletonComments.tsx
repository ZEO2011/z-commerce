import SkeletonList from "@/components/ui/SkeletonList";
import Stars from "@/components/ui/Stars";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonComments() {
	return (
		<SkeletonList amount={1}>
			<div className="w-full py-2 min-h-[6rem] bg-white shadow-lg flex gap-2 px-2 rounded-lg dark:bg-slate-800 pt-3">
				<div className="w-14">
					<Skeleton className="w-12 h-12 object-cover rounded-[50%]"></Skeleton>
				</div>
				<div className="flex flex-col w-full">
					<div className="flex gap-2 mb-1">
						<div>
							<Skeleton className="w-16 h-4"></Skeleton>
						</div>
						<div>
							<Skeleton className="w-12 h-4"></Skeleton>
						</div>
					</div>
					<div className="min-h-[4rem] flex flex-col justify-between pb-3 pr-2.5">
						<div className="dark:text-slate-200 text-gray-700">
							<Skeleton className="h-12 w-96"></Skeleton>
						</div>
						<div className="flex justify-end">
							<Stars user={false} amount={5} />
						</div>
					</div>
				</div>
			</div>
		</SkeletonList>
	);
}
