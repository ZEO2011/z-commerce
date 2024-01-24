import SkeletonProducts from "@/pages/shoppingCart/components/SkeletonProducts";
import Product from "@/pages/shoppingCart/components/product/Product";
import { useProducts, usePurchasedList, useUserData } from "@/store";
import getTableItemData from "@/utils/getTableItemData";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Purchased() {
	const { setPurchasedList, isLoading, purchasedList } = usePurchasedList(
		(store) => store,
	);
	const userData = useUserData((store) => store);
	const { products: fetchedProducts, loading } = useProducts(
		(store) => store,
	);
	useEffect(() => {
		async function fetchProducts() {
			try {
				if (!userData.authenticated) throw "login first";
				const purchasedList = await getTableItemData<
					shoppingCartItemType,
					string,
					shoppingCartItemType[]
				>(
					"shopping-cart",
					"email",
					userData.data?.user?.email ?? "",
				);
				if (loading) return;
				if (!purchasedList) return;
				// getting the products that it's id exists in the productsList
				const products = fetchedProducts.filter((product) =>
					purchasedList[0].purchased?.some(
						(purchasedProduct) =>
							purchasedProduct === String(product.id),
					),
				);
				setPurchasedList(products, false);
			} catch (error) {
				toast.error(`error - ${error}`);
			}
		}
		if (isLoading) fetchProducts();
	}, [userData, userData.authenticated, loading, fetchedProducts]);
	return (
		<div className="flex flex-col mt-6 gap-2">
			<h1 className="font-bold">Purchased products</h1>
			<div
				className="flex h-fit flex-col gap-2 pb-6"
				style={{ flex: "2.5 2.5 0%" }}
			>
				{!isLoading ? (
					purchasedList.length > 0 ? (
						purchasedList.map((product) => (
							<Product
								noDel
								key={product.id}
								{...product}
							/>
						))
					) : (
						<h1>No products purchased</h1>
					)
				) : (
					<SkeletonProducts />
				)}
			</div>
		</div>
	);
}
