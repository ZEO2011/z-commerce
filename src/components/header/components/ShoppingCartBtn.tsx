import { Button } from "@/components/ui/button";
import { useShoppingCart } from "@/store";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function ShoppingCartBtn() {
	const amountProducts = useShoppingCart(
		(store) => store.amountProducts.length,
	);
	return (
		<Button
			aria-label="shopping cart button"
			asChild
			variant="outline"
			size="icon"
			className="relative"
		>
			<Link to="/shopping-cart">
				<FontAwesomeIcon
					icon={faShoppingCart}
					className="h-[1.2rem] w-[1.2rem] scale-100 transition-all"
				/>
				{amountProducts > 0 && (
					<div
						className={`absolute text-black rounded-[50%] -left-2.5 -top-1 bg-yellow-300 w-6 h-6 grid place-items-center`}
					>
						{amountProducts > 9 ? "9+" : amountProducts}
					</div>
				)}
			</Link>
		</Button>
	);
}
