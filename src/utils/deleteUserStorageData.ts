import supabase from "@/supabase"

export default async function deleteUserStorageData(bucketName: string) {
	const { error } = await supabase.from(bucketName).delete()
	return error
}
