"use client";

import React from "react";
import { useDrop } from "react-dnd";
import { Button } from "@/components/ui/button";
import type { EmailCanvasProps, EmailComponent } from "@/types";

export function EmailCanvas({
	components,
	onDrop,
	onSelectComponent,
	onRemoveComponent,
}: EmailCanvasProps) {
	const [, drop] = useDrop({
		accept: "component",
		drop: (item: Partial<EmailComponent>, monitor) => {
			const delta = monitor.getDifferenceFromInitialOffset();
			const left = Math.round(delta?.x || 0);
			const top = Math.round(delta?.y || 0);
			onDrop({ ...item, position: { left, top } } as EmailComponent);
		},
	});

	return (
		<div
			ref={drop}
			className="relative min-h-[600px] border-2 border-dashed border-gray-300 p-4"
		>
			{components.map((component) => (
				<div
					key={component.id}
					style={{
						position: "absolute",
						left: (component as any).position?.left,
						top: (component as any).position?.top,
					}}
					className="p-2 mb-2 border border-gray-200 cursor-pointer"
					onClick={() => onSelectComponent(component)}
				>
					{component.type} Component
					<Button
						size="sm"
						variant="ghost"
						className="ml-2"
						onClick={(e) => {
							e.stopPropagation();
							onRemoveComponent(component.id);
						}}
					>
						X
					</Button>
				</div>
			))}
		</div>
	);
}
