import supabase from "@/supabase";

export default async function uploadDatabaseFile(
	bucketName: string,
	file: File | undefined,
	userId: string,
	fileName: string = crypto.randomUUID(),
) {
	if (file) {
		await supabase.storage
			.from(bucketName)
			.upload(`${userId}/${fileName}`, file, {
				cacheControl: "3600",
				upsert: false,
			});
	}
}
