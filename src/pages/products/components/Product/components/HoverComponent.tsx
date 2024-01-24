import { HoverCardContent } from "@/components/ui/hover-card";

type HoverComponent = {
	name: string;
	description: string;
};

export default function HoverComponent({ name, description }: HoverComponent) {
	return (
		<HoverCardContent>
			<h2 className="text-lg font-semibold">{name}</h2>
			<p className="text-sm">{description}</p>
		</HoverCardContent>
	);
}
