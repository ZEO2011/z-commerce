import supabase from "@/supabase";

export default async function deleteTableItem(
	tableName: string,
	column: string,
	value: string,
) {
	const { error } = await supabase
		.from(tableName)
		.delete()
		.eq(column, value);
	return { error };
}
