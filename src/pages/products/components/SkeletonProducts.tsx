import SkeletonList from "@/components/ui/SkeletonList";
import Stars from "@/components/ui/Stars";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import formatPrice from "@/utils/formatPrice";

export default function SkeletonProducts({ amount }: { amount?: number }) {
	const currentAmount = amount ?? 6;
	return (
		<div className="products w-full gap-4 grid grid-cols-3">
			<SkeletonList amount={currentAmount}>
				<div className="product w-full h-96 shadow-lg hover:shadow-xl transition overflow-hidden pb-2 rounded-lg flex flex-col bg-white dark:bg-slate-900">
					<div className="img-container cursor-pointer w-full h-fit mb-3 overflow-hidden">
						<Skeleton className="w-full h-80" />
					</div>
					<div className="text pb-2 pl-4 h-12">
						<Skeleton className="w-36 h-6" />
					</div>
					<div className="px-3 flex flex-col gap-3">
						<Skeleton className="w-20 h-5 ml-auto mr-2" />
						<div className="flex justify-between items-center">
							<h3>{formatPrice(100)}</h3>
							<span className="dark:text-gray-300 text-gray-600">
								<Stars user={false} amount={5} />
							</span>
						</div>
						<div>
							<Button
								aria-label="look at the product"
								className="w-full transition"
								disabled
							>
								loading...
							</Button>
						</div>
					</div>
				</div>
			</SkeletonList>
		</div>
	);
}
