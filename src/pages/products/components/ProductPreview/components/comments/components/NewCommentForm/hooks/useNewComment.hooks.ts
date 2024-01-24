import {
    useProducts,
    useProfilePicture,
    usePurchasedList,
    useUserData,
} from "@/store";
import getTableDataFrom from "@/utils/getTableDataFrom";
import getTableItemData from "@/utils/getTableItemData";
import insertTableDataFrom from "@/utils/insertTableItem";
import updateTableItem from "@/utils/updateTableItem";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type UseNewCommentArgs = Omit<commentType, "id" | "profile_image"> & {
    comments: commentType[];
    setComments: Dispatch<SetStateAction<commentType[]>>;
    setFormLoading: Dispatch<SetStateAction<boolean>>;
};

export default function useNewComment(args: UseNewCommentArgs) {
    const {
        body,
        comments,
        product_id,
        setComments,
        setFormLoading,
        created_at,
        stars,
        email,
    } = args;
    const { authenticated } = useUserData((store) => store);
    const profilePicture = useProfilePicture((store) => store.profilePicture);
    const { products, setProduct } = useProducts((store) => store);
    const { isLoading, purchasedList, setPurchasedList } = usePurchasedList(
        (store) => store,
    );
    const append = async () => {
        try {
            // if (body.length === 0) throw "body cannot be empty";
            if (!authenticated) throw "login first";
            const checkExistInPurchaseList = (
                purchasedList: productType[],
            ) => {
                if (
                    !purchasedList.some(
                        (product) => String(product.id) === product_id,
                    )
                )
                    throw "product not purchased";
            };
            if (isLoading) {
                const purchasedListReq = (await getTableItemData<
                    shoppingCartItemType,
                    string,
                    [shoppingCartItemType]
                >("shopping-cart", "email", email)) as [
                        shoppingCartItemType,
                    ];
                if (!purchasedListReq[0]) throw "never purchased"
                const purchasedList = products.filter((product) =>
                    purchasedListReq[0].purchased.some(
                        (purchasedProduct) =>
                            purchasedProduct === String(product.id),
                    ),
                );
                console.log(purchasedList);
                setPurchasedList(purchasedList, false);
                checkExistInPurchaseList(purchasedList);
            } else checkExistInPurchaseList(purchasedList);
            setFormLoading(true);
            const { error } = await insertTableDataFrom<
                Omit<commentType, "id">
            >("comments", {
                body,
                created_at,
                email,
                product_id,
                profile_image: profilePicture as string,
                stars,
            });
            if (error) throw "something went wrong";
            const currentProduct = products.find(
                (product) => product.id === parseInt(product_id),
            ) as productType;
            const commentsStars = comments
                .filter((comment) => comment.product_id === product_id)
                .map((comment) => comment.stars);
            const evaluation = Math.floor(
                commentsStars.reduce(
                    (acc, cur) => acc + cur,
                    currentProduct.stars,
                ) / commentsStars.length,
            );
            const { error: productUpdateError } = await updateTableItem<{
                stars: number;
            }>("products", "id", product_id, {
                stars: evaluation,
            });
            if (productUpdateError) throw "";
            const { data, error: fetchCommentsError } =
                await getTableDataFrom<commentType[]>("comments");
            if (fetchCommentsError) throw "something went wrong";
            const lastCommentID = data?.at(-1)?.id ?? 0;
            setComments((c) => [
                ...c,
                {
                    ...args,
                    profile_image: profilePicture as string,
                    id: lastCommentID,
                },
            ]);
            setProduct(parseInt(product_id), {
                ...currentProduct,
                stars: evaluation,
            });
            toast.success("your comment successfully added");
        } catch (error) {
            if (error === "never purchased") {
                try {
                    await insertTableDataFrom("shopping-cart", {
                        email,
                        purchased: [],
                    })
                } catch {
                    toast.error("database errro")
                }
                toast.error("please purchase the product first");
            } else toast.error(`error - ${error}`);
        } finally {
            setFormLoading(false);
        }
    };
    return {
        append,
    };
}
