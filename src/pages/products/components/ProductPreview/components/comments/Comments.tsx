import { Dispatch, SetStateAction } from "react";
import Comment from "./components/Comment/Comment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "react-router-dom";

export default function Comments({
    comments,
    setComments,
    productID,
}: {
    comments: commentType[];
    setComments: Dispatch<SetStateAction<commentType[]>>;
    productID: string;
}) {
    const [currentTabSearchParams, setCurrentTabSearchParams] = useSearchParams({ tab: "all" })

    return comments?.length > 0 ? (
        <Tabs defaultValue={currentTabSearchParams.get("tab") || "all"} className="w-full">
            <TabsList >
                <TabsTrigger value="all" onClick={() => setCurrentTabSearchParams({ tab: "all" })}>
                    All
                </TabsTrigger>
                <TabsTrigger value="positive" onClick={() => setCurrentTabSearchParams({ tab: "positive" })} >
                    Positive
                </TabsTrigger>
                <TabsTrigger value="negative" onClick={() => setCurrentTabSearchParams({ tab: "negative" })}>
                    Negative
                </TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col gap-1.5" value="all">

                {
                    comments.map((comment) => {
                        return (
                            <Comment
                                comments={comments}
                                productID={productID}
                                setComments={setComments}
                                {...comment}
                                key={comment.id}
                            />
                        );
                    })
                }
            </TabsContent>
            <TabsContent className="flex flex-col gap-1.5" value="positive">

                {
                    comments.filter(comment => comment.stars >= 3).map((comment) => {
                        return (
                            <Comment
                                comments={comments}
                                productID={productID}
                                setComments={setComments}
                                {...comment}
                                key={comment.id} // Use a unique identifier as the key
                            />
                        );
                    })
                }
            </TabsContent>
            <TabsContent className="flex flex-col gap-1.5" value="negative">
                {
                    comments.filter(comment => comment.stars < 3).map((comment) => {
                        return (
                            <Comment
                                comments={comments}
                                productID={productID}
                                setComments={setComments}
                                {...comment}
                                key={comment.id} // Use a unique identifier as the key
                            />
                        );
                    })
                }
            </TabsContent>
        </Tabs>
    ) : (
        <div className="w-full h-full grid place-items-center mt-4">
            <h2>no comments yet!</h2>
        </div>
    );
}
