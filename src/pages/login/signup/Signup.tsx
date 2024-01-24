import { FormEvent, Suspense, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ImageSelect } from "./components/ImageSelect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Await, Navigate, useNavigate, useNavigation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import uploadDatabaseFile from "@/utils/uploadDatabaseFile";
import { useProfilePicture, useUserData } from "@/store";
import getDatabaseFile from "@/utils/getDatabaseFile";
import Purchased from "./components/Purchased";
import supabase from "@/supabase";
import { PROJECT_URL } from "@/constants";

export default function Signup() {
	const userData = useUserData((store) => store);
	const databaseImagePromise = getDatabaseFile(
		"profileImage",
		userData?.data?.user?.id ?? "",
	);
	const setProfilePicture = useProfilePicture(
		(store) => store.setProfilePicture,
	);
	const { state } = useNavigation();
	const [formLoading, setFormLoading] = useState(false);
	const displayNameInputRef = useRef<HTMLInputElement>(null);
	const isLoading =
		state === "loading" || state === "submitting" || formLoading;
	const navigate = useNavigate();
	const [uploadedImage, setUploadedImage] = useState<File>();
	async function formSubmitHandler(e: FormEvent) {
		e.preventDefault();
		setFormLoading(true);
		if (userData.authenticated) {
			if (userData.data.user) {
				const { error } = await supabase.storage
					.from("profileImage")
					.remove(["57c23540-3667-4723-a961-11af4d30b2e0/file"]);
				if (error)
					return toast.error("error - something went wrong");
				await uploadDatabaseFile(
					"profileImage",
					uploadedImage,
					userData.data.user.id,
					"file",
				);
				setProfilePicture(
					`${PROJECT_URL}/storage/v1/object/public/profileImage/${
						userData.data.user?.id
					}/file?${performance.now()}`,
					false,
				);
				if (displayNameInputRef.current?.value === "")
					throw toast.error(
						"error - the display name cannot be empty",
					);
				setFormLoading(false);
				return navigate("/");
			} else {
				setFormLoading(false);
				return toast.error("error occurred");
			}
		}
	}

	return userData.authenticated ? (
		<>
			<form
				onSubmit={formSubmitHandler}
				encType="multipart/form-data"
				className="container mx-auto my-4"
			>
				<Suspense
					fallback={
						<Skeleton className="w-[7rem] h-[7rem] rounded-full mx-auto" />
					}
				>
					<Await resolve={databaseImagePromise}>
						{(data) => (
							<>
								<ImageSelect
									savedImage={data}
									uploadedImage={uploadedImage}
									setUploadedImage={setUploadedImage}
								/>
							</>
						)}
					</Await>
				</Suspense>
				<div className="xl:px-96 flex flex-col gap-2">
					<div>
						<Input
							disabled
							title="email"
							value={userData?.data?.user?.email}
						/>
					</div>
					<div>
						<Input
							ref={displayNameInputRef}
							title="display name"
							defaultValue={
								userData?.data?.user?.user_metadata.name
							}
						/>
					</div>
					<Button
						type="submit"
						aria-label="signup button"
						disabled={isLoading}
						className="mt-1"
					>
						{isLoading ? "loading..." : "save"}
					</Button>
				</div>
			</form>
			<Purchased />
		</>
	) : (
		<Navigate to="/login" />
	);
}
