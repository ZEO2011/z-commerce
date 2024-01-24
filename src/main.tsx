import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./assets/sass/style.scss";
import "./assets/sass/normalize.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={createBrowserRouter(router)} />
	</StrictMode>,
);
