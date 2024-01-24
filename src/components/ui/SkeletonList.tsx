import React from "react";

export default function SkeletonList({
	amount,
	children,
}: {
	amount: number;
	children: React.ReactNode;
}) {
	const skeletonArray = new Array(amount).fill(null);
	return skeletonArray.map((_, index) => <div key={index}>{children}</div>);
}
