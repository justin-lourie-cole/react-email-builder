import React from "react";
import { render } from "@react-email/render";
import {
	Html,
	Head,
	Body,
	Container,
	Section,
	Row,
	Column,
	Img,
	Link,
	Text,
	Button,
	Heading,
} from "@react-email/components";
import type { CodeGeneratorFunction, RenderComponentFunction } from "@/types";

export const generateEmailHTML: CodeGeneratorFunction = (components) => {
	const renderComponent: RenderComponentFunction = (component) => {
		switch (component.type) {
			case "Text":
				return <Text key={component.id}>{component.text}</Text>;
			case "Button":
				return (
					<Button key={component.id} href={component.href}>
						{component.text}
					</Button>
				);
			case "Heading":
				return (
					<Heading key={component.id} as={`h${component.level}`}>
						{component.text}
					</Heading>
				);
			case "Link":
				return (
					<Link key={component.id} href={component.href}>
						{component.text}
					</Link>
				);
			case "Image":
				return (
					<Img
						key={component.id}
						src={component.src}
						alt={component.alt}
						width={component.width}
						height={component.height}
					/>
				);
			case "Section":
				return (
					<Section key={component.id}>
						{component.children?.map(renderComponent)}
					</Section>
				);
			case "Container":
				return (
					<Container key={component.id}>
						{component.children?.map(renderComponent)}
					</Container>
				);
			default:
				return null;
		}
	};

	const emailJSX = (
		<Html>
			<Head />
			<Body style={main}>
				<Container>{components.map(renderComponent)}</Container>
			</Body>
		</Html>
	);

	// Use React Email's render function to compile to HTML
	const emailHTML = render(emailJSX);

	return emailHTML;
};

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
