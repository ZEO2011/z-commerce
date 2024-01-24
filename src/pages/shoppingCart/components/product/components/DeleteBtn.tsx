import { useProducts, useShoppingCart } from "@/store";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";

export default function DeleteBtn({
	id,
	setPrice,
}: {
	id: number;
	setPrice?: Dispatch<SetStateAction<number>>;
}) {
	const removeProduct = useShoppingCart((store) => store.removeProduct);
	const [isLoading, setIsLoading] = useState(false);
	const currentProduct = useProducts((store) =>
		store.products.find((product) => product.id === id),
	) as productType;
	async function clearHandler() {
		setIsLoading(true);
		setPrice!((c) => c - currentProduct.price);
		removeProduct(id);
	}
	return (
		<button
			type="button"
			aria-label="delete button"
			onClick={clearHandler}
			className="delete group-hover:opacity-100 inset-0 w-full h-full grid opacity-0 place-items-center absolute bg-red-600 transition bg-opacity-90 rounded-lg z-50"
		>
			{!isLoading ? (
				<FontAwesomeIcon
					icon={faTrash}
					className="text-5xl text-white"
				/>
			) : (
				<FontAwesomeIcon
					icon={faSpinner}
					className="text-5xl animate-spin text-white"
				/>
			)}
		</button>
	);
}
