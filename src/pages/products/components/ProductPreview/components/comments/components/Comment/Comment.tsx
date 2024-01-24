import Stars from "@/components/ui/Stars";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ADMINS } from "@/constants";
import { useUserData } from "@/store";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { Dispatch, SetStateAction, Suspense, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useDeleteComment from "./hooks/useDeleteComment.hook";

export default function Comment({
	body,
	created_at,
	email,
	profile_image,
	id,
	stars,
	setComments,
	productID,
	comments,
}: commentType & {
	setComments: Dispatch<SetStateAction<commentType[]>>;
	productID: string;
	comments: commentType[];
}) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const deleteHook = useDeleteComment(id, productID, comments, setComments);
	async function deleteHandler() {
		deleteHook.remove();
	}
	const commentRef = useRef<HTMLDivElement>(null);
	const user = useUserData((store) =>
		store.authenticated ? store.data.user : "",
	);
	return (
		<>
			<div
				ref={commentRef}
				className="comment group/delete-btn w-full min-h-[6rem] bg-white shadow-lg flex gap-2 px-2 rounded-lg dark:bg-slate-900 pt-3"
			>
				<div className="sm:w-14 w-fit">
					{profile_image.length !== 0 ? (
						<Suspense
							fallback={
								<Skeleton className="w-12 h-12 object-cover rounded-[50%]" />
							}
						>
							<LazyLoadImage
								beforeLoad={() => setImageLoaded(false)}
								alt="profile picture"
								loading="lazy"
								onLoad={() => setImageLoaded(true)}
								src={`${profile_image}?${performance.now()}`}
								width="100%"
								height="13rem"
								className={`w-12 h-12 object-cover rounded-[50%] sm:block hidden transition ${
									imageLoaded ? "!blur-0" : "blur-md"
								}`}
							/>
						</Suspense>
					) : (
						<Avatar className="bg-orange-500 grid place-items-center">
							Z
						</Avatar>
					)}
				</div>
				<div className="flex flex-col w-full">
					<div className="mb-1 flex justify-between pr-3">
						<div className="flex gap-2 sm:flex-row flex-col">
							<h3>{email}</h3>
							<h2 className="dark:text-slate-300 text-gray-500">
								{format(
									new Date(created_at),
									"d/HH/YYY",
								)}
							</h2>
						</div>
						{user ? (
							(email === user.email ||
								ADMINS.some((admin) =>
									user?.email?.includes(admin),
								)) && (
								<button
									aria-label="delete button comment"
									onClick={deleteHandler}
									className="transition sm:mt-0 mt-4 hover:text-red-500 trash-icon opacity-0 group-hover/delete-btn:opacity-100"
								>
									<FontAwesomeIcon icon={faTrash} />
								</button>
							)
						) : (
							<></>
						)}
					</div>
					<div className="min-h-[4rem] flex flex-col justify-between pb-3 pr-2.5">
						<p className="dark:text-slate-200 text-gray-700">
							{body}
						</p>
						<div className="flex justify-end">
							<Stars user={false} amount={stars} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
