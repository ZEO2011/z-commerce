import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import React, {
	Dispatch,
	SetStateAction,
	Suspense,
	useRef,
	useState,
} from "react";
import { Await } from "react-router-dom";
import { PROJECT_URL } from "@/constants";
import { useUserData } from "@/store";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function ImageSelect({
	setUploadedImage,
	uploadedImage,
	savedImage,
}: {
	uploadedImage: File | undefined;
	setUploadedImage: Dispatch<SetStateAction<File | undefined>>;
	savedImage?: databaseBucketDataType;
}) {
	async function uploadHandler(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files?.item(0)) {
			const file = e.target.files[0];
			setUploadedImage(file);
		}
	}
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imageLoaded, setImageLoaded] = useState(false);
	const {
		authenticated: isAuth,
		data: { user },
	} = useUserData((store) => store);
	return (
		<>
			<div className="flex items-center flex-col gap-4 w-fit mx-auto mb-4">
				{isAuth ? (
					uploadedImage ? (
						<Suspense
							fallback={
								<Skeleton className="w-[7rem] h-[7rem] rounded-full"></Skeleton>
							}
						>
							<Avatar
								style={{
									width: "7rem",
									height: "7rem",
								}}
								className="w-[7rem] h-[7rem]"
								asChild
							>
								<LazyLoadImage
									loading="lazy"
									src={URL.createObjectURL(
										uploadedImage,
									)}
									beforeLoad={() =>
										setImageLoaded(false)
									}
									alt="selected image"
									onLoad={() => setImageLoaded(true)}
									width="100%"
									height="13rem"
									className={`object-cover rounded-[50%] transition ${
										imageLoaded
											? "!blur-0"
											: "blur-md"
									}`}
								/>
							</Avatar>
						</Suspense>
					) : (
						<Suspense
							fallback={
								<Skeleton className="w-[7rem] h-[7rem] rounded-full"></Skeleton>
							}
						>
							<Await resolve={user}>
								{(user) => (
									<>
										{savedImage?.data && (
											<Avatar
												style={{
													width: "7rem",
													height: "7rem",
													fontSize:
														"3rem",
												}}
												asChild
											>
												{savedImage.data.at(
													-1,
												)?.name &&
												savedImage.data.at(
													-1,
												).name !==
													".emptyFolderPlaceholder" ? (
													<LazyLoadImage
														loading="lazy"
														src={`${PROJECT_URL}/storage/v1/object/public/profileImage/${
															user.id
														}/${
															savedImage.data.at(
																-1,
															)
																.name
														}?${performance.now()}`}
														beforeLoad={() =>
															setImageLoaded(
																false,
															)
														}
														alt="selected image"
														onLoad={() =>
															setImageLoaded(
																true,
															)
														}
														width="100%"
														height="13rem"
														className={`object-cover rounded-[50%] transition ${
															imageLoaded
																? "!blur-0"
																: "blur-md"
														}`}
													/>
												) : user ? (
													<LazyLoadImage
														loading="lazy"
														src={
															user
																.user_metadata
																.avatar_url
														}
														beforeLoad={() =>
															setImageLoaded(
																false,
															)
														}
														alt="selected image"
														onLoad={() =>
															setImageLoaded(
																true,
															)
														}
														width="100%"
														height="13rem"
														className={`object-cover rounded-[50%] transition ${
															imageLoaded
																? "!blur-0"
																: "blur-md"
														}`}
													/>
												) : (
													<Avatar className="bg-orange-500 grid place-items-center">
														Z
													</Avatar>
												)}
											</Avatar>
										)}
									</>
								)}
							</Await>
						</Suspense>
					)
				) : (
					<Skeleton className="w-[7rem] h-[7rem] rounded-full"></Skeleton>
				)}
				<Button
					type="button"
					aria-label="select an image"
					className="mx-auto cursor-pointer w-48 sm:w-96"
					id="upload-profile-pic-parent"
					onClick={() => fileInputRef.current?.click()}
				>
					upload an image
				</Button>
				<input
					ref={fileInputRef}
					className="hidden"
					type="file"
					accept="image/*"
					onChange={uploadHandler}
				/>
			</div>
		</>
	);
}
