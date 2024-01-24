import Stars from "@/components/ui/Stars";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProducts() {
	return (
		<div className="h-[35rem] lg:h-40 p-2 w-full dark:bg-slate-900 flex lg:flex-row flex-col shadow-md mb-2 bg-white rounded-lg relative">
			<div className="lg:w-56 w-full justify-center flex lg:mb-0 mb-2 h-full overflow-hidden image-container">
				<Skeleton className="w-full lg:w-56 h-full rounded-lg object-cover transition" />
			</div>
			<div className="w-full h-fit lg:h-full flex flex-col justify-between px-2 lg:ml-4 pr-1.5 pt-2">
				<div className="flex flex-col">
					<div className="flex h-6 w-full justify-between mb-2 items-center">
						<h2 className="font-semibold text-xl">
							<Skeleton className="w-32 h-4"></Skeleton>
						</h2>
						<h3 className="mb-0.5">
							<Skeleton className="w-28 h-4"></Skeleton>
						</h3>
					</div>
					<Skeleton className=" h-fit lg:h-14 w-96"></Skeleton>
				</div>
				<div className="flex w-full justify-between items-center mt-4 lg:mt-[1.40rem]">
					<h2 className="font-semibold text-xl">
						{Intl.NumberFormat(undefined, {
							style: "currency",
							currency: "USD",
						})
							.format(0)
							.replace(".00", "")}
					</h2>
					<div className="flex items-center gap-1">
						<Stars user={false} amount={5} />
					</div>
				</div>
			</div>
		</div>
	);
}
