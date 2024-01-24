import Stars from "@/components/ui/Stars"
import SkeletonContent from "./components/SkeletonContent"
import BuyBtn from "./components/BuyBtn"
import { useProducts } from "@/store"
import { useMemo } from "react"

export default function Content({ productID }: { productID: string }) {
	const { products, loading } = useProducts((store) => store)
	const product = useMemo(
		() => products.find((product) => product.id === +productID),
		[productID, products],
	)
	return (
		<>
			{loading ? (
				<SkeletonContent />
			) : (
				<>
					<h1 className="mt-0 font-bold mb-2">
						{product?.name}
					</h1>
					<h2 className="text-xl mb-2 text-gray-950 dark:text-slate-100">
						category: {product?.category}
					</h2>
					<h2 className="text-xl mb-2 text-gray-950 dark:text-slate-100">
						price:{" "}
						{product &&
							Intl.NumberFormat(undefined, {
								style: "currency",
								currency: "USD",
							})
								.format(product?.price)
								.replace(".00", "")}
					</h2>
					<h2 className="text-xl mb-4 text-gray-950 dark:text-slate-100 flex gap-1 items-center">
						stars:{" "}
						{product && (
							<Stars user={false} amount={product.stars} />
						)}
					</h2>
					<p className="text-gray-900 mb-3 dark:text-slate-300">
						{product?.description}
					</p>
					<BuyBtn productID={productID} />
				</>
			)}
		</>
	)
}
