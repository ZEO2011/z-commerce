import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import compress from "vite-plugin-compression";
import viteTsconfigPaths from "vite-tsconfig-paths";
import path from "path";
export default defineConfig({
	plugins: [react(), compress(), viteTsconfigPaths()],
	build: {
		minify: true,
		chunkSizeWarningLimit: 50000,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
