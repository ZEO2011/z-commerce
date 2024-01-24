import { Navigate, RouteObject, defer } from "react-router-dom";
import { lazy } from "react";
import ErrorPage from "./pages/ErrorPage";
const Products = lazy(() => import("./pages/products/Products"));
import RootLayout from "./layouts/RootLayout";
import getTableItemData from "./utils/getTableItemData";
const Login = lazy(() => import("./pages/login/login/Login"));
const Signup = lazy(() => import("./pages/login/signup/Signup"));
const ShoppingCart = lazy(() => import("./pages/shoppingCart/ShoppingCart"));
const ProductPreview = lazy(
	() => import("./pages/products/components/ProductPreview/ProductPreview"),
);

export const router: RouteObject[] = [
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: (
							<Navigate to="/products?q=&category=all" />
						),
					},
					{
						path: "/products",
						children: [
							{
								index: true,
								element: <Products />,
							},
							{
								path: ":productID",
								element: <ProductPreview />,
								loader: ({ params: { productID } }) => {
									if (productID) {
										const commentsPromise =
											getTableItemData<
												commentType,
												number,
												commentType
											>(
												"comments",
												"product_id",
												parseInt(productID),
											);
										return defer({
											commentsPromise,
											productID,
										});
									}
									return null;
								},
							},
						],
					},
					{
						path: "/login",
						element: <Login />,
					},
					{
						path: "/logging",
						element: <Signup />,
					},
					{
						path: "/shopping-cart",
						element: <ShoppingCart />,
					},
				],
			},
		],
	},
];
