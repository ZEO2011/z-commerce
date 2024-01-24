import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Comments from "./components/comments/Comments";
import NewCommentForm from "./components/comments/components/NewCommentForm/NewCommentForm";
import Content from "./components/content/Content";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useProducts } from "@/store";
import SkeletonComments from "./components/comments/components/SkeletonComments";
import CommentsStats from "./components/CommentsStats/CommentsStats";

export default function ProductPreview() {
    const { commentsPromise, productID } = useLoaderData() as {
        commentsPromise: Promise<commentType[]>;
        productID: string;
    };
    const [imageLoaded, setImageLoaded] = useState(false);
    const [comments, setComments] = useState<commentType[]>([]);
    const { products, loading } = useProducts((store) => store);
    const product = useMemo(
        () => products.find((product) => product.id === +productID),
        [productID, products],
    );
    useEffect(() => {
        async function getComments() {
            const comments = await commentsPromise;
            setComments(comments);
        }
        getComments();
    }, [commentsPromise]);
    return (
        <div className="container flex md:flex-row flex-col gap-4">
            <div className="w-fit h-full">
                {loading ? (
                    <Skeleton className="rounded-lg shadow-lg w-96 h-42 object-cover" />
                ) : (
                    <>
                        <LazyLoadImage
                            beforeLoad={() => setImageLoaded(false)}
                            loading="lazy"
                            src={product?.image}
                            alt={product?.name}
                            onLoad={() => setImageLoaded(true)}
                            width="100%"
                            height="13rem"
                            className={`rounded-lg shadow-lg w-96 h-42 object-cover ${imageLoaded ? "!blur-0" : "blur-md"
                                }`}
                        />
                    </>
                )}
            </div>
            <div className="min-h-full w-full">
                <Content productID={productID} />
                <div className="comments flex flex-col">
                    <div className="comment">
                        <h1 className="mb-4">comments</h1>
                        <CommentsStats comments={comments} />
                        <div className="comments-container w-full h-fit flex flex-col gap-2 pb-4">
                            <Suspense fallback={<SkeletonComments />}>
                                <Await resolve={commentsPromise}>
                                    {() => {
                                        return (
                                            <Comments
                                                productID={
                                                    productID
                                                }
                                                setComments={
                                                    setComments
                                                }
                                                comments={comments}
                                            />
                                        );
                                    }}
                                </Await>
                            </Suspense>
                            <NewCommentForm
                                comments={comments}
                                setComments={setComments}
                                productID={productID}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
