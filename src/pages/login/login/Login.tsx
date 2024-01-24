import { useTheme } from "@/store";
import supabase from "@/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const DEFAULT_THEME = window.matchMedia("(prefers-color-scheme: dark)").matches;
export default function Login() {
	const theme = useTheme((store) => store.theme);
	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="sign-form w-[50%] h-full pt-12">
				<h1 className="mt-0 mb-2">welcome to z-commerce</h1>
				<Auth
					supabaseClient={supabase}
					theme={
						theme === "system"
							? DEFAULT_THEME
								? "dark"
								: "light"
							: theme
					}
					providers={["google", "discord"]}
					appearance={{
						theme: ThemeSupa,
						variables: {
							default: {
								colors: {
									brand: "rgb(15, 23, 42)",
									brandAccent: "rgb(15, 23, 42)",
								},
							},
						},
					}}
				/>
			</div>
		</div>
	);
}
