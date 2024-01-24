import supabase from "@/supabase";

export default async function updateTableItem<T>(
	tableName: string,
	column: string,
	value: string,
	data: T,
) {
	const { error } = await supabase
		.from(tableName)
		.update(data)
		.eq(column, value);
	return { error };
}
