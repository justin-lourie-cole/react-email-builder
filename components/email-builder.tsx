"use client";

import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentSidebar } from "@/components/component-sidebar";
import { EmailCanvas } from "@/components/email-canvas";
import { PropertyEditor } from "@/components/property-editor";
import { EmailPreview } from "@/components/email-preview";
import { useUndo } from "@/hooks/use-undo";
import { generateEmailHTML } from "./code-generator";
import type { EmailBuilderProps, EmailComponent } from "@/types";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import pretty from "pretty";

export function EmailBuilder({
	initialComponents = [],
	onSave,
}: EmailBuilderProps) {
	const [components, setComponents, { undo, redo, canUndo, canRedo }] =
		useUndo<EmailComponent[]>(initialComponents);
	const [selectedComponent, setSelectedComponent] =
		useState<EmailComponent | null>(null);
	const [htmlCode, setHtmlCode] = useState<string | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

	const addComponent = useCallback(
		(component: Partial<EmailComponent>) => {
			setComponents([
				...components,
				{ ...component, id: Date.now().toString() } as EmailComponent,
			]);
		},
		[components, setComponents],
	);

	const updateComponent = useCallback(
		(updatedComponent: EmailComponent) => {
			setComponents(
				components.map((comp) =>
					comp.id === updatedComponent.id ? updatedComponent : comp,
				),
			);
		},
		[components, setComponents],
	);

	const removeComponent = useCallback(
		(id: string) => {
			setComponents(components.filter((comp) => comp.id !== id));
		},
		[components, setComponents],
	);

	const exportCode = async () => {
		const code = await generateEmailHTML(components);
		const prettyCode = pretty(code);
		setHtmlCode(prettyCode); // Set the formatted HTML code
		setIsDialogOpen(true); // Open the dialog
	};

	const handleSave = () => {
		if (onSave) {
			onSave(components);
		}
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex h-screen">
				<ComponentSidebar
					onDragStart={(component) => console.log("Drag started:", component)}
				/>
				<div className="flex-1 p-4">
					<div className="mb-4 space-x-2">
						<Button onClick={undo} disabled={!canUndo}>
							Undo
						</Button>
						<Button onClick={redo} disabled={!canRedo}>
							Redo
						</Button>
						<Button onClick={exportCode}>Export Code</Button>{" "}
						{/* Trigger code generation */}
						<Button onClick={handleSave}>Save Template</Button>
					</div>
					<Tabs defaultValue="canvas">
						<TabsList>
							<TabsTrigger value="canvas">Canvas</TabsTrigger>
							<TabsTrigger value="preview">Preview</TabsTrigger>
						</TabsList>
						<TabsContent value="canvas">
							<EmailCanvas
								components={components}
								onDrop={addComponent}
								onSelectComponent={setSelectedComponent}
								onRemoveComponent={removeComponent}
							/>
						</TabsContent>
						<TabsContent value="preview">
							<EmailPreview components={components} />
						</TabsContent>
					</Tabs>
				</div>
				<PropertyEditor
					component={selectedComponent}
					onUpdateComponent={updateComponent}
				/>
			</div>

			{/* Dialog for displaying generated HTML */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Generated Email HTML</DialogTitle>
						<DialogDescription>
							Below is the generated HTML for the email template.
						</DialogDescription>
					</DialogHeader>
					{htmlCode && (
						<div className="mt-4 p-2 border rounded bg-gray-100">
							<pre>{htmlCode}</pre>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</DndProvider>
	);
}
