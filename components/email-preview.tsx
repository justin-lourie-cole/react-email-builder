"use client";

import React from "react";
import { Html, Head, Body, Container } from "@react-email/components";
import type { EmailPreviewProps, RenderComponentFunction } from "@/types";
import { componentMap } from "@/types";

export function EmailPreview({ components }: EmailPreviewProps) {
	const renderComponent: RenderComponentFunction = (component) => {
		const Component = componentMap[component.type];
		if (!Component) return null;

		switch (component.type) {
			case "Text":
			case "Button":
			case "Heading":
			case "Link":
				return (
					<Component key={component.id} {...component}>
						{component.text}
					</Component>
				);
			case "Image":
				return <Component key={component.id} {...component} />;
			case "Section":
			case "Container":
				return (
					<Component key={component.id} {...component}>
						{component.children?.map(renderComponent)}
					</Component>
				);
			default:
				return null;
		}
	};

	return (
		<div className="border border-gray-300 p-4">
			<Html>
				<Head />
				<Body style={main}>
					<Container>
						{components.map((component) => renderComponent(component))}
					</Container>
				</Body>
			</Html>
		</div>
	);
}

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
