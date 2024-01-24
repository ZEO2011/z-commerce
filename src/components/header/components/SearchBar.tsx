import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
	const navigate = useNavigate();
	function inputKeyUpHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			navigate(`/search?q=${e.currentTarget.value}&subCategory=`, {});
		}
	}
	return (
		<Input
			onKeyUp={inputKeyUpHandler}
			type="search"
			width="100%"
			placeholder="search"
		/>
	);
}
