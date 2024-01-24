import { lazy } from "react";
import { useProducts } from "@/store";
import ProductsSkeleton from "@/components/skeletons/ProductsSkeleton";
import { useSearchParams } from "react-router-dom";
import Product from "./components/Product/Product";
const Sidebar = lazy(() => import("./components/Sidebar/Sidebar"));

export default function Products() {
    const { loading, products } = useProducts((store) => store);
    const [searchValue, setSearchValue] = useSearchParams({
        q: "",
        category: "all",
    });
    return !loading ? (
        <div className="products w-full flex flex-col items-center gap-4">
            <div className="w-full min-h-[30rem] flex md:flex-nowrap gap-4 flex-wrap py-4">
                <Sidebar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <div className="products w-full gap-4 grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {products
                        .filter((product) =>
                            product.name
                                .toLowerCase()
                                .includes(
                                    searchValue
                                        .get("q")
                                        ?.toLowerCase() ?? "",
                                ),
                        )
                        .filter((product) =>
                            searchValue.get("category") === "all"
                                ? true
                                : product.subCategory ===
                                searchValue.get("category"),
                        )
                        .map((product) => {
                            return (
                                <Product
                                    key={crypto.randomUUID()}
                                    {...product}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    ) : (
        <ProductsSkeleton />
    );
}
