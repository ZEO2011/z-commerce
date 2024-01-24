import supabase from "@/supabase";

export default async function insertTableDataFrom<T>(
	tableName: string,
	insertData: T,
) {
	const { data, error } = await supabase.from(tableName).insert(insertData);
	if (error) {
		console.error("Error inserting data:", error);
		return { data: null, error };
	}
	return { data, error: null };
}
