import { PRODUCT_CATEGORIES } from "@/constants";
import SkeletonList from "../ui/SkeletonList";
import { Skeleton } from "../ui/skeleton";
import SkeletonProducts from "@/pages/products/components/SkeletonProducts";

export default function ProductsSkeleton() {
	return (
		<div className="products w-full flex flex-col items-center gap-2">
			<div className="w-full min-h-[30rem] flex md:flex-nowrap gap-4 flex-wrap py-4">
				<aside className="h-full w-full md:w-72 pt-4 md:sticky inset-0 mr-2">
					<h2 className="font-semibold text-xl mb-2">categories</h2>
					<div className="w-full flex flex-col gap-1">
						<SkeletonList amount={PRODUCT_CATEGORIES.length}>
							<Skeleton className="w-full h-9 mb-2" />
						</SkeletonList>
					</div>
				</aside>
				<SkeletonProducts />
			</div>
		</div>
	);
}
