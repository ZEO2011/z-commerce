import { Link } from "react-router-dom";
import Product from "./components/product/Product";
import SkeletonProducts from "./components/SkeletonProducts";
import { useProducts, useShoppingCart } from "@/store";
import { Button } from "@/components/ui/button";
import Sidebar from "./components/Sidebar";
import ClearProducts from "./components/ClearProducts";
import { useMemo, useState } from "react";

export default function ShoppingCart() {
    const { products, loading } = useProducts((store) => store);
    const amountProducts = useShoppingCart((store) => store.amountProducts);
    const filteredProducts = useMemo(
        () =>
            products.filter((el) => {
                return amountProducts.some((subEl) => subEl === el.id);
            }),
        [amountProducts],
    );
    const [price, setPrice] = useState(
        filteredProducts.reduce((acc, cur) => acc + cur.price, 0),
    );
    return (
        <>
            <div className="products w-full h-fit flex pb-4 lg:flex-row flex-col">
                {amountProducts.length > 0 ? (
                    <Sidebar price={price} products={filteredProducts} />
                ) : null}
                <div
                    className="flex h-fit flex-col gap-2"
                    style={{ flex: "2.5 2.5 0%" }}
                >
                    {loading ? (
                        <SkeletonProducts />
                    ) : amountProducts.length > 0 ? (
                        filteredProducts.map((el) => {
                            return (
                                <Product
                                    setPrice={setPrice}
                                    key={crypto.randomUUID()}
                                    {...el}
                                />
                            );
                        })
                    ) : (
                        <div className="w-full h-full grid place-items-center">
                            you haven&apos;t bought anything yet! go and buy
                            something{" "}
                            <Button
                                aria-label="return to home button"
                                asChild
                                variant="link"
                            >
                                <Link to="/">here</Link>
                            </Button>
                        </div>
                    )}
                    {amountProducts.length > 0 && <ClearProducts />}
                </div>
            </div>
        </>
    );
}
