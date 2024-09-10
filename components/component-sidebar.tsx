"use client";

import type React from "react";
import { useDrag } from "react-dnd";
import type {
	ComponentSidebarProps,
	DraggableComponentProps,
	ComponentType,
} from "@/types";
import { componentMap } from "@/types";

const components: {
	type: ComponentType;
	name: string;
	component: React.ComponentType<any>;
}[] = [
	{ type: "Text", name: "Text", component: componentMap.Text },
	{ type: "Button", name: "Button", component: componentMap.Button },
	{ type: "Image", name: "Image", component: componentMap.Image },
	{ type: "Heading", name: "Heading", component: componentMap.Heading },
	{ type: "Link", name: "Link", component: componentMap.Link },
	{ type: "Section", name: "Section", component: componentMap.Section },
	{ type: "Container", name: "Container", component: componentMap.Container },
];

export function ComponentSidebar({ onDragStart }: ComponentSidebarProps) {
	return (
		<div className="w-64 bg-gray-100 p-4 overflow-y-auto">
			<h2 className="text-lg font-semibold mb-4">Components</h2>
			{components.map((component) => (
				<DraggableComponent
					key={component.type}
					component={component}
					onDragStart={onDragStart}
				/>
			))}
		</div>
	);
}

function DraggableComponent({
	component,
	onDragStart,
}: DraggableComponentProps) {
	const [{ isDragging }, drag] = useDrag({
		type: "component",
		item: { ...component },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	return (
		<div
			ref={drag}
			className={`p-2 mb-2 bg-white rounded cursor-move ${isDragging ? "opacity-50" : ""}`}
			onDragStart={() => onDragStart(component)}
		>
			{component.name}
		</div>
	);
}
