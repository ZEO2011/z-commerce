type CaptionType = {
	title: string
}
export default function Caption({ title }: CaptionType) {
	return (
		<div className="w-full mb-8">
			<h1 className="font-bold">{title}</h1>
		</div>
	)
}
