import Stars from "@/components/ui/Stars";
import formatPrice from "@/utils/formatPrice";
import DeleteBtn from "./components/DeleteBtn";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Dispatch, SetStateAction, useState } from "react";

export default function Product({
	image,
	name,
	category,
	description,
	price,
	stars,
	id,
	noDel,
	setPrice,
}: productType & {
	noDel?: boolean;
	setPrice?: Dispatch<SetStateAction<number>>;
}) {
	const formattedDescription = description.slice(0, 250);
	const [imageLoaded, setImageLoaded] = useState(false);
	return (
		<div className="shopping-cart-product group h-[35rem] lg:h-40 p-2 w-full dark:bg-slate-900 flex lg:flex-row flex-col shadow-md bg-white rounded-lg relative">
			{!noDel && <DeleteBtn setPrice={setPrice} id={id} />}
			<div className="lg:w-56 rounded-lg w-full justify-center flex lg:mb-0 mb-2 h-full overflow-hidden image-container">
				<LazyLoadImage
					beforeLoad={() => setImageLoaded(false)}
					loading="lazy"
					src={image}
					alt={name}
					onLoad={() => setImageLoaded(true)}
					width="100%"
					height="13rem"
					className={`w-full lg:w-56 h-full rounded-lg object-cover transition group-hover:scale-110 ${
						imageLoaded ? "!blur-0" : "blur-md"
					}`}
				/>
			</div>
			<div className="w-full h-fit lg:h-full flex flex-col justify-between px-2 lg:ml-4 pr-1.5 pt-2">
				<div className="flex flex-col">
					<div className="flex h-6 w-full justify-between mb-2 items-center">
						<h2 className="font-semibold text-xl">{name}</h2>
						<h3 className="text-gray-800 mb-0.5 dark:text-slate-400">
							{category}
						</h3>
					</div>
					<p className="text-gray-800 dark:text-slate-400 h-fit lg:h-14">
						{formattedDescription.length > 250
							? `${formattedDescription}...`
							: formattedDescription}
					</p>
				</div>
				<div className="flex w-full justify-between items-center mt-4 lg:mt-[1.40rem]">
					<h2 className="font-semibold text-xl">
						{formatPrice(price)}
					</h2>
					<div className="flex items-center gap-1">
						<Stars user={false} amount={stars} />
					</div>
				</div>
			</div>
		</div>
	);
}
