import SkeletonList from "@/components/ui/SkeletonList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PRODUCT_CATEGORIES } from "@/constants";
import { useProducts } from "@/store";
import { useRef } from "react";
import Accordions from "./components/Accordions";

type SidebarProps = {
	searchValue: URLSearchParams;
	setSearchValue: (
		callback: (prev: URLSearchParams) => URLSearchParams | URLSearchParams,
		options?: { replace?: boolean },
	) => void;
};

export default function Sidebar({ setSearchValue, searchValue }: SidebarProps) {
	const { loading, products } = useProducts((store) => store);
	const searchInput = useRef<HTMLInputElement>(null);
	return (
		<aside className="h-full w-full md:w-96 md:sticky inset-0 mr-2">
			<h2 className="font-semibold text-xl mb-2">categories</h2>
			<div className="w-full flex flex-col gap-1">
				{!loading && (
					<div className="flex gap-1.5 h-12 items-center justify-center">
						<Input
							className="m-0"
							placeholder="search"
							defaultValue={searchValue.get("q") ?? ""}
							ref={searchInput}
						/>
						<Button
							onClick={() => {
								setSearchValue(
									(prev) => {
										prev.set("q", searchInput?.current?.value ?? "");
										return prev;
									},
									{ replace: true },
								);
							}}
						>
							filter
						</Button>
					</div>
				)}
				{!loading ? (
					<Accordions data={products} setCategory={setSearchValue} />
				) : (
					<SkeletonList amount={PRODUCT_CATEGORIES.length}>
						<Skeleton className="w-full h-9 mb-2" />
					</SkeletonList>
				)}
				{!loading ? (
					<Button
						className="mt-2"
						onClick={() => {
							setSearchValue((prev) => {
								prev.set("q", "");
								prev.set("category", "all");
								return prev;
							});
						}}
					>
						clear
					</Button>
				) : (
					<Button className="mt-2" disabled>
						loading...
					</Button>
				)}
			</div>
		</aside>
	);
}
