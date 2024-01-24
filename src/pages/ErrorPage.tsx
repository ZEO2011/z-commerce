import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
	const navigate = useNavigate();
	return (
		<div className="mx-auto w-fit flex flex-col items-center">
			<h1 className="mb-8 font-bold">error - something went wrong</h1>
			<Button
				aria-label="go to home button"
				className="w-[40rem]"
				onClick={() => navigate("/")}
			>
				go to home
			</Button>
		</div>
	);
}
