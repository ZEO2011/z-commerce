export default function formatPrice(
	price: number,
	options: Intl.NumberFormatOptions = {
		style: "currency",
		currency: "USD",
	},
) {
	return Intl.NumberFormat(undefined, options)
		.format(price)
		.replace(".00", "");
}
