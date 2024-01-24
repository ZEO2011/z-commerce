import { cn } from "@/lib/utils";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentPropsWithoutRef, useState } from "react";

type Stars =
	| {
			user: true;
			onChange?: (value: number) => void;
	  }
	| {
			user: false;
			amount: number;
	  };
export default function Stars(props: Stars = { user: false, amount: 0 }) {
	const [chosenAmount, setChosenAmount] = useState(0);
	const [hoveredAmount, setHoveredAmount] = useState(0);
	const formattedStars = new Array(5).fill(null);
	const starClick = (index: number) => {
		if (props.user)
			if (props.onChange) {
				props.onChange(5 - index);
				setChosenAmount(5 - index);
			}
	};
	return (
		<>
			<div className="flex flex-row w-fit" key={crypto.randomUUID()}>
				{!props.user
					? formattedStars
							.map((_, index) => {
								return index < props.amount ? (
									<Star
										key={crypto.randomUUID()}
										active
									/>
								) : (
									<Star key={crypto.randomUUID()} />
								);
							})
							.reverse()
					: formattedStars
							.map((_, index) => {
								return -(hoveredAmount - 1 - 5) <=
									index + 1 ? (
									<Star
										className="w-fit h-fit cursor-pointer transition duration-300 scale-125"
										active
										onMouseOver={() =>
											setHoveredAmount(
												-(index - 5),
											)
										}
										onMouseLeave={() =>
											setHoveredAmount(
												chosenAmount,
											)
										}
										onClick={() =>
											starClick(index)
										}
										key={crypto.randomUUID()}
									/>
								) : (
									<Star
										className="w-fit h-fit cursor-pointer"
										onMouseOver={() =>
											setHoveredAmount(
												-(index - 5),
											)
										}
										onMouseLeave={() =>
											setHoveredAmount(
												chosenAmount,
											)
										}
										onClick={() =>
											starClick(index)
										}
										key={crypto.randomUUID()}
									/>
								);
							})
							.reverse()}
			</div>
		</>
	);
}

function Star({
	active = false,
	...restProps
}: { active?: boolean } & ComponentPropsWithoutRef<"div">) {
	return (
		<div
			{...restProps}
			className={cn(
				"w-[1.30rem] h-7 grid place-items-center",
				restProps.className,
			)}
		>
			<FontAwesomeIcon
				key={crypto.randomUUID()}
				className={`${
					active
						? "!text-yellow-300"
						: "dark:text-white text-gray-300"
				}`}
				icon={faStar}
			/>
		</div>
	);
}
