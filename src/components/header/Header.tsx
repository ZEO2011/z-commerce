import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import supabase from "@/supabase";
import ShoppingCartBtn from "./components/ShoppingCartBtn";
import { dummyUserData } from "@/constants";
import { useProfilePicture, useShoppingCart, useUserData } from "@/store";

import { Skeleton } from "../ui/skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function Header() {
	const navigate = useNavigate();
	const clearShoppingCart = useShoppingCart((store) => store.clearProducts);
	const { authenticated, setUserData } = useUserData((store) => store);
	const { profilePicture, loading: isPictureLoaded } = useProfilePicture(
		(store) => store,
	);
	const [imageLoaded, setImageLoaded] = useState(false);
	return (
		<>
			<header className="w-full shadow-lg h-[4.8rem] z-50 dark:bg-slate-900 bg-white flex justify-between items-center px-6">
				<Link to={"/"} className="cursor-pointer md:mr-0 mr-4">
					<h1 className="font-bold">Z</h1>
				</Link>
				<nav className="w-fit h-full">
					<ul className="w-fit h-full flex items-center gap-2">
						<li>
							<ShoppingCartBtn />
						</li>
						<li>
							<ModeToggle />
						</li>
						{authenticated ? (
							<li className="ml-1">
								<DropdownMenu>
									<DropdownMenuTrigger>
										{!isPictureLoaded ? (
											<Avatar asChild>
												<LazyLoadImage
													beforeLoad={() =>
														setImageLoaded(
															false,
														)
													}
													alt="profile"
													loading="lazy"
													src={
														profilePicture as string
													}
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
											</Avatar>
										) : (
											<Skeleton className="rounded-[50%] w-12 h-12" />
										)}
									</DropdownMenuTrigger>
									<DropdownMenuContent className="absolute -right-7">
										<DropdownMenuLabel>
											my profile
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={() =>
												navigate("/logging")
											}
										>
											profile
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={async () => {
												await supabase.auth.signOut();
												setUserData({
													authenticated:
														false,
													error: null,
													data: {
														user: dummyUserData,
													},
												});
												clearShoppingCart();
											}}
										>
											logout
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</li>
						) : (
							<Button asChild>
								<Link to="/login">login</Link>
							</Button>
						)}
					</ul>
				</nav>
			</header>
		</>
	);
}
