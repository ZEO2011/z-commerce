type themeStoreType = {
	theme: "light" | "dark" | "system";
	setTheme: (theme: "light" | "dark" | "system") => void;
};

type databaseBucketSuccessObject = {
	data: FileObject[];
	error: null;
};
type databaseBucketFailedObject = {
	data: null;
	error: StorageError;
};
type databaseBucketDataType =
	| databaseBucketSuccessObject
	| databaseBucketFailedObject;

type productType = {
	name: string;
	price: number;
	stars: number;
	description: string;
	category: "electronics" | "clothes" | "home accessories" | "gaming";
	subCategory: string;
	image: string;
	id: number;
};

type shoppingCartType = {
	amountProducts: number[];
	setAmountProducts: (id: number | string) => void;
	setAllAmountProducts: (IDs: string[]) => void;
	removeProduct: (id: number | string) => void;
	clearProducts: () => void;
};

type commentType = {
	id: number;
	created_at: Date;
	product_id: string;
	body: string;
	email: string;
	profile_image: string;
	stars: number;
};

type shoppingCartItemType = {
	id: number;
	email: string;
	purchased: string[];
};

type successUserResponse = { data: { user: User }; error: null };
