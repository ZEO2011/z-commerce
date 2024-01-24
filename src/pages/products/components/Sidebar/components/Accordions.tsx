import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/constants";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function Accordions({
	data,
	setCategory,
}: {
	data: productType[];
	setCategory: (
		callback: (prev: URLSearchParams) => URLSearchParams | URLSearchParams,
		options?: { replace?: boolean },
	) => void;
}) {
	const accordions = [...new Set(PRODUCT_CATEGORIES)].map((el) => ({
		[el]: [
			...new Set(
				data
					.filter((subEl) => subEl.category === el)
					.map((el) => el.subCategory),
			),
		],
	}));
	return (
		<Accordion type="single" collapsible>
			{accordions.map((el, index) => (
				<AccordionItem key={index} value={`category-${index}`} className="px-2">
					<AccordionTrigger>{Object.keys(el)[0]}</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-1">
						<>
							{el[Object.keys(el)[0]].map((el, index) => (
								<Button
									className="w-full text-start flex justify-start"
									aria-label="category list button"
									onClick={() =>
										setCategory(
											(prev: URLSearchParams) => {
												prev.set("category", el);
												return prev;
											},
											{ replace: true },
										)
									}
									variant="link"
									key={index}
								>
									{el}
								</Button>
							))}
						</>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
