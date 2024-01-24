import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faComputer } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export function ModeToggle() {
	const { setTheme, theme } = useTheme((store) => store);
	function changeTheme(theme: themeStoreType["theme"]) {
		setTheme(theme);
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		if (theme === "system") {
			const systemTheme = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches
				? "dark"
				: "light";
			root.classList.add(systemTheme);
			return;
		}
		root.classList.add(theme);
	}
	function checkTheme() {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		if (theme === "system") {
			const systemTheme = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches
				? "dark"
				: "light";
			root.classList.add(systemTheme);
			return;
		}
		root.classList.add(theme);
	}
	useEffect(() => checkTheme(), []);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					aria-label="mode toggle button"
					variant="outline"
					size="icon"
				>
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					className="flex"
					onClick={() => changeTheme("light")}
				>
					<div className="h-full w-5 mr-2">
						<FontAwesomeIcon icon={faSun} />
					</div>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex"
					onClick={() => changeTheme("dark")}
				>
					<div className="h-full w-5 mr-2">
						<FontAwesomeIcon
							icon={faMoon}
							className="ml-0.5"
						/>
					</div>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex"
					onClick={() => changeTheme("system")}
				>
					<div className="h-full w-5 mr-2">
						<FontAwesomeIcon icon={faComputer} />
					</div>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// TODO: change the icon library
// TODO: change the blur duration for profile picture
