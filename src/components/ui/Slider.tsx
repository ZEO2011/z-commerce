import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type SliderType = {
	items: string[];
};
export default function Slider({ items }: SliderType) {
	const [imgIndex, setImgIndex] = useState(0);
	function showNextImage() {
		setImgIndex((c) => {
			if (c === items.length - 1) return 0;
			return c + 1;
		});
	}
	function showPreviousImage() {
		setImgIndex((c) => {
			if (c === 0) return items.length - 1;
			return c - 1;
		});
	}
	return (
		<div className="w-full h-fit gap-14 lg:flex justify-between items-center hidden">
			<button
				aria-label="go next button"
				onClick={showPreviousImage}
				className="w-12 dark:bg-slate-900  h-12 mb-14 shadow-lg grid place-items-center rounded-[50%]"
			>
				<FontAwesomeIcon size="lg" icon={faArrowLeft} />
			</button>
			<div className="w-full h-fit flex overflow-hidden">
				{items.map((item) => (
					<img
						alt="slider"
						style={{
							translate: `${-100 * imgIndex}%`,
							transition: "translate 300ms ease-in-out",
						}}
						key={item}
						src={item}
						className="w-full p-4 shrink-0 grow-0"
					/>
				))}
			</div>
			<button
				aria-label="go previous button"
				onClick={showNextImage}
				className="w-12 dark:bg-slate-900  h-12 mb-14 shadow-lg grid place-items-center rounded-[50%]"
			>
				<FontAwesomeIcon size="lg" icon={faArrowRight} />
			</button>
		</div>
	);
}
