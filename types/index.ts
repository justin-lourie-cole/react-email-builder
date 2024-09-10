import type { ReactNode } from "react";

import {
	Button,
	Container,
	Heading,
	Img,
	Link,
	Section,
	Text,
} from "@react-email/components";

// Base component properties
export interface BaseComponentProps {
	id: string;
	type: ComponentType;
	width?: string;
	fullWidth?: boolean;
	style?: React.CSSProperties;
}

// Specific component properties
export interface TextComponentProps extends BaseComponentProps {
	type: "Text";
	text: string;
	fontSize?: string;
	color?: string;
}

export interface ButtonComponentProps extends BaseComponentProps {
	type: "Button";
	text: string;
	href: string;
	backgroundColor?: string;
	color?: string;
}

export interface ImageComponentProps extends BaseComponentProps {
	type: "Image";
	src: string;
	alt: string;
	width?: string;
	height?: string;
}

export interface HeadingComponentProps extends BaseComponentProps {
	type: "Heading";
	text: string;
	level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface LinkComponentProps extends BaseComponentProps {
	type: "Link";
	text: string;
	href: string;
	color?: string;
}

export interface SectionComponentProps extends BaseComponentProps {
	type: "Section";
	children: EmailComponent[];
}

export interface ContainerComponentProps extends BaseComponentProps {
	type: "Container";
	children: EmailComponent[];
}

// Union type for all component props
export type EmailComponent =
	| TextComponentProps
	| ButtonComponentProps
	| ImageComponentProps
	| HeadingComponentProps
	| LinkComponentProps
	| SectionComponentProps
	| ContainerComponentProps;

// Type for component types
export type ComponentType = EmailComponent["type"];

// Mapping of component types to their respective React Email components
export const componentMap = {
	Text,
	Button,
	Image: Img,
	Heading,
	Link,
	Section,
	Container,
};

// Props for the main EmailBuilder component
export interface EmailBuilderProps {
	initialComponents?: EmailComponent[];
	onSave?: (components: EmailComponent[]) => void;
}

// Props for the ComponentSidebar
export interface ComponentSidebarProps {
	onDragStart: (component: Partial<EmailComponent>) => void;
}

// Props for the EmailCanvas
export interface EmailCanvasProps {
	components: EmailComponent[];
	onDrop: (component: EmailComponent) => void;
	onSelectComponent: (component: EmailComponent) => void;
	onRemoveComponent: (id: string) => void;
}

// Props for the PropertyEditor
export interface PropertyEditorProps {
	component: EmailComponent | null;
	onUpdateComponent: (updatedComponent: EmailComponent) => void;
}

// Props for the EmailPreview
export interface EmailPreviewProps {
	components: EmailComponent[];
}

// Type for the undo/redo hook
export interface UndoRedoState<T> {
	past: T[];
	present: T;
	future: T[];
}

export interface UndoRedoActions {
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
}

// Type for the code generator function
export type CodeGeneratorFunction = (
	components: EmailComponent[],
) => Promise<string>;

// DraggableComponent props
export interface DraggableComponentProps {
	component: {
		type: ComponentType;
		name: string;
		component: React.ComponentType<any>;
	};
	onDragStart: (component: Partial<EmailComponent>) => void;
}

// Render function type for components in EmailPreview
export type RenderComponentFunction = (component: EmailComponent) => ReactNode;
