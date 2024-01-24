import supabase from "@/supabase";

export default async function getTableDataFrom<T>(
	tableName: string,
	range?: { from: number; to: number },
) {
	if (range) {
		const { data, error } = await supabase
			.from(tableName)
			.select("*")
			.range(range.from, range.to);
		const dataWithType = data as T;
		return { data: dataWithType, error };
	} else {
		const { data, error } = await supabase.from(tableName).select("*");
		if (error) throw new Error("fetching products data error");
		const dataWithType = data as T;
		return { data: dataWithType, error };
	}
}
