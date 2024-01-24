import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Caption from "@/components/ui/Caption";
import { ReactNode, Suspense, useEffect } from "react";
import { useProducts, useProfilePicture, useUserData } from "@/store";
import { Toaster } from "sonner";
import supabase from "@/supabase";
import ProductsSkeleton from "@/components/skeletons/ProductsSkeleton";
import getTableDataFrom from "@/utils/getTableDataFrom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PROJECT_URL, dummyUserData } from "@/constants";
import getDatabaseFile from "@/utils/getDatabaseFile";
const stripePromise = loadStripe(
    "pk_test_51OCvyCA6PPqlznhTKC7ahX3s7uJPqomrbFuuwiex5OBbx7GDqs4Im6hPjFy1vQxLPxxx8qnOfNyIgWfDJElt4Y3500TMWT2goq",
);
export default function RootLayout() {
    const { pathname } = useLocation();
    const setUserData = useUserData((store) => store.setUserData);
    const setProfilePicture = useProfilePicture(
        (store) => store.setProfilePicture,
    );
    const routesData: Record<string, { title: string; loading?: ReactNode }> =
    {
        "/products": {
            title: "products",
            loading: <ProductsSkeleton />,
        },
        "/shopping-cart": { title: "shopping cart" },
        default: { title: "" },
    };
    const setProducts = useProducts((store) => store.setProducts);
    useEffect(() => {
        (async () => {
            const userResponse = await supabase.auth.getUser();
            if (userResponse.error)
                setUserData({
                    authenticated: false,
                    error: null,
                    data: { user: dummyUserData },
                });
            else {
                setUserData({
                    ...userResponse,
                    authenticated: true,
                });
                const { data: profilePicture } = await getDatabaseFile(
                    "profileImage",
                    userResponse.data.user?.id as string,
                );
                setProfilePicture(
                    `${profilePicture.length !== 0
                        ? `${PROJECT_URL}/storage/v1/object/public/profileImage/${userResponse.data.user?.id}/file`
                        : userResponse.data.user.user_metadata
                            .avatar_url ??
                        "https://dgjgjjcqryywqdbvyime.supabase.co/storage/v1/object/public/profileImage/unkown"
                    }?${performance.now()}`,
                    false,
                );
            }
        })();
        (async () => {
            const products = await getTableDataFrom<productType[]>(
                "products",
            );
            setProducts(products.data);
        })();
    }, [setProducts, setUserData]);
    return (
        <Elements stripe={stripePromise}>
            <Header />
            <div className="container min-h-full">
                <Caption title={routesData[pathname]?.title} />
                <Suspense fallback={routesData[pathname]?.loading}>
                    <Outlet />
                </Suspense>
            </div>

            <Toaster richColors />
        </Elements>
    );
}
