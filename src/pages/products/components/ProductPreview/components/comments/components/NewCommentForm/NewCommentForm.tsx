import Stars from "@/components/ui/Stars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserData } from "@/store";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import useNewComment from "./hooks/useNewComment.hooks";

export default function NewCommentForm({
	productID,
	setComments,
	comments,
}: {
	productID: string;
	setComments: Dispatch<SetStateAction<commentType[]>>;
	comments: commentType[];
}) {
	const bodyValue = useRef<HTMLInputElement>(null);
	const [formShow, setFormShow] = useState<boolean>(false);
	const [formLoading, setFormLoading] = useState(false);
	const [stars, setStars] = useState(0);
	const userData = useUserData((store) => store);
	const commentCaller = useNewComment({
		body: (bodyValue.current?.value ?? "") as string,
		stars,
		setComments,
		setFormLoading,
		comments,
		created_at: new Date(),
		email: userData?.data?.user?.email as string,
		product_id: productID,
	});
	async function newCommentFormHandler(e: FormEvent) {
		e.preventDefault();
		await commentCaller.append();
		setFormShow(false);
	}
	return (
		<div className="pb-12 mt-1">
			{(formShow || formLoading) && (
				<form className="pb-4" onSubmit={newCommentFormHandler}>
					<Input ref={bodyValue} title="body" />
					<div className="mt-4">
						<Stars user onChange={setStars} />
					</div>
					<div>
						<Button
							aria-label="new comment button"
							disabled={formLoading}
							type="submit"
							className="mt-3 mr-2"
						>
							{formLoading ? "loading..." : "new comment"}
						</Button>
						<Button
							aria-label="cancel new comment button"
							onClick={() => setFormShow(false)}
							variant="ghost"
							disabled={formLoading}
						>
							cancel
						</Button>
					</div>
				</form>
			)}
			{!formShow && (
				<Button
					aria-label="show new comment button"
					onClick={() => {
						setFormShow(true);
					}}
				>
					new comment
				</Button>
			)}
		</div>
	);
}
