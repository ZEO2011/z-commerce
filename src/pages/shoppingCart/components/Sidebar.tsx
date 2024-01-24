import { Button } from "@/components/ui/button";
import { useProducts } from "@/store";
import formatPrice from "@/utils/formatPrice";
import BuyBtn from "./BuyBtn";

type SidebarProps = {
    price: number;
    products: productType[]
};

export default function Sidebar({ price, products }: SidebarProps) {
    const loading = useProducts((store) => store.loading);
    return (
        <>
            <div className="w-full mr-1.5 flex-1 h-96 mb-4 lg:h-full lg:sticky inset-0 top-1.5 px-2 flex flex-col">
                <h2 className="mt-0 text-lg mb-2.5 font-semibold">
                    buy the products!
                </h2>
                <p className="mb-4">
                    This is where the Stripe checkout would go but this is
                    just a demo with no real server so it cannot accept
                    payments. Clicking the pay button will emulate what
                    would happen if you did make a successful payment.
                </p>
                <div className="flex-col">
                    {!loading && (
                        <h3 className="mb-2">
                            total: {formatPrice(price)}
                        </h3>
                    )}
                    {loading ? (
                        <Button disabled className="w-full">
                            loading...
                        </Button>
                    ) : (
                        <BuyBtn chosenProducts={products} />
                    )}
                </div>
            </div>
        </>
    );
}
