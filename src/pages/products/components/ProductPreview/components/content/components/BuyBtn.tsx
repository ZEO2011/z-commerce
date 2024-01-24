import { Button } from "@/components/ui/button";
import { useShoppingCart, useUserData } from "@/store";
import { useState } from "react";
import { toast } from "sonner";

export default function BuyBtn({ productID }: { productID: string }) {
	const { amountProducts, setAmountProducts } = useShoppingCart(
		(store) => store,
	);
	const [clicked, setClicked] = useState(false);
	const checkIfProductIsAlreadyBought = () => {
		return amountProducts.includes(parseInt(productID));
	};
	const authenticated = useUserData((store) => store.authenticated);
	const handleBuyClick = async () => {
		try {
			if (authenticated) {
				if (!checkIfProductIsAlreadyBought()) {
					setClicked(true);
					setAmountProducts(productID);
				}
			} else throw "login first";
		} catch (error) {
			toast.error(`Error - ${error}`);
		}
	};
	return (
		<Button
			onClick={clicked ? undefined : handleBuyClick}
			className="w-full"
			aria-label="buy product button"
		>
			{clicked ? "Check your shopping cart!" : "Buy it!"}
		</Button>
	);
}
