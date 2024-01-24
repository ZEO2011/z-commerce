import { Button } from "@/components/ui/button";
import { useShoppingCart, useUserData } from "@/store";
import updateTableItem from "@/utils/updateTableItem";
import { useState } from "react";

export default function ClearProducts() {
	const clearProducts = useShoppingCart((store) => store.clearProducts);
	const [isLoading, setIsLoading] = useState(false);
	const userEmail = useUserData((store) => store?.data?.user?.email);
	async function clearHandler() {
		setIsLoading(true);
		try {
			await updateTableItem<{ paid: string[] }>(
				"shopping-cart",
				"email",
				userEmail ?? "",
				{ paid: [] },
			);
			clearProducts();
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<Button
			aria-label="clear products"
			disabled={isLoading}
			onClick={clearHandler}
		>
			{!isLoading ? "clear all" : "loading..."}
		</Button>
	);
}
