import supabase from "@/supabase";
import type { SearchOptions } from "@supabase/storage-js/src/lib/types";

export default async function getDatabaseFile(
	bucketName: string,
	id: string,
	options: SearchOptions = {
		offset: 0,
		sortBy: {
			column: "created_at",
			order: "asc",
		},
	},
) {
	const { data, error } = await supabase.storage
		.from(bucketName)
		.list(`${id}/`, options);
	if (error) throw { data: null, error };
	return { data, error };
}
