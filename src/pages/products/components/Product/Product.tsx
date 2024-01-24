import Stars from "@/components/ui/Stars";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import formatPrice from "@/utils/formatPrice";
import { Suspense, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import HoverComponent from "./components/HoverComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart, useUserData } from "@/store";
import { toast } from "sonner";



const Product = ({
    name,
    price,
    stars,
    description,
    category,
    image,
    id,
    ...restProps
}: Omit<productType, "subCategory">) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { setAmountProducts: newProduct, amountProducts } = useShoppingCart(
        (store) => store,
    );
    const navigate = useNavigate();
    const [addedToCard, setAddedToCard] = useState(false);
    const isInCart = useMemo(() => !amountProducts.includes(id), []);
    const authenticated = useUserData((store) => store.authenticated);
    return (
        <HoverCard>


            <HoverCardTrigger
                {...restProps}
                className="product group w-full h-fit shadow-lg hover:shadow-xl transition overflow-hidden pb-2 rounded-lg bg-white dark:bg-slate-900"
            >
                <NavLink to={`/products/${id}`} className="flex flex-col ">
                    <Suspense fallback={<Skeleton className="w-full h-52" />}>
                        <div className="img-container cursor-pointer w-full h-fit mb-3 overflow-hidden">
                            <LazyLoadImage
                                beforeLoad={() => setImageLoaded(false)}
                                loading="lazy"
                                src={image}
                                alt={name}
                                onLoad={() => setImageLoaded(true)}
                                width="100%"
                                height="20rem"
                                className={`object-cover w-full h-80 transition group-hover:scale-110 ${imageLoaded ? "!blur-0" : "blur-md"
                                    }`}
                            />
                        </div>
                    </Suspense>
                    <div className="text pb-2 pl-4 h-12">
                        <h2 className="font-semibold text-xl mb-2">{name}</h2>
                    </div>
                    <div className="px-3 flex flex-col gap-3">
                        <p className="text-right text-gray-600 dark:text-gray-300">
                            {category}
                        </p>
                        <div className="flex justify-between items-center">
                            <h3 className="text-green-500 font-bold">
                                {formatPrice(price)}
                            </h3>
                            <span className="dark:text-gray-300 text-gray-600">
                                <Stars user={false} amount={stars} />
                            </span>
                        </div>
                    </div>
                </NavLink>
                <div className="flex gap-1.5 mt-1 px-2 pb-0.5">
                    <Button
                        aria-label="look at the product"
                        className="w-full transition flex-1"
                        onClick={() => navigate(`/products/${id}?tab=all`)}
                    >
                        see comments
                    </Button>
                    <Button
                        className="flex-1 flex gap-2 items-center"
                        onClick={() => {
                            if (authenticated) {
                                newProduct(id);
                                setAddedToCard(true);
                            } else
                                toast.error("error - login first");
                        }}
                        disabled={!isInCart || addedToCard}
                    >
                        {isInCart ? (
                            !addedToCard ? (
                                <>
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}
                                    />{" "}
                                    add to card
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                    />{" "}
                                    added to card
                                </>
                            )
                        ) : (
                            "in the cart"
                        )}
                    </Button>
                </div>
            </HoverCardTrigger>
            <HoverComponent name={name} description={description} />
        </HoverCard>
    );
};
export default Product;
