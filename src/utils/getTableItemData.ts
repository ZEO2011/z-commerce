import supabase from "@/supabase";

export default async function getTableItemData<T, K, E>(
	tableName: string,
	item: keyof T,
	value: K,
) {
	if (typeof item !== "string") return;
	const { data, error } = await supabase
		.from(tableName)
		.select("*")
		.eq(item, value);
	if (error) throw new Error("fetching products data error");
	return data as E;
}
