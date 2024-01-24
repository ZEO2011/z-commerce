import { useProducts } from "@/store";
import deleteTableItem from "@/utils/deleteTableItem";
import updateTableItem from "@/utils/updateTableItem";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export default function useDeleteComment(
	id: number,
	productID: string,
	comments: commentType[],
	setComments: Dispatch<SetStateAction<commentType[]>>,
) {
	const { setProduct, products } = useProducts((store) => store);
	const remove = async () => {
		try {
			const { error } = await deleteTableItem(
				"comments",
				"id",
				`${id}`,
			);
			if (error) throw "something went wrong";
			const currentProduct = products.find(
				(product) => product.id === parseInt(productID),
			) as productType;
			setComments((comments) =>
				comments.filter((comment) => comment.id !== id),
			);
			const commentsStars = comments
				.filter((comment) => comment.product_id === productID)
				.map((comment) => comment.stars);
			const evaluation = Math.floor(
				commentsStars.reduce(
					(acc, cur) => acc + cur,
					currentProduct.stars,
				) / commentsStars.length,
			);
			const { error: productUpdateError } = await updateTableItem<{
				stars: number;
			}>("products", "id", productID, {
				stars: evaluation,
			});
			if (productUpdateError) throw "something went wrong";
			setProduct(parseInt(productID), {
				...currentProduct,
				stars: evaluation,
			});
			toast.success("comment deleted");
		} catch (error) {
			toast.error(`error - ${error}`);
		}
	};
	return {
		remove,
	};
}
