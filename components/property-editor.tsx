"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { PropertyEditorProps } from "@/types";

export function PropertyEditor({
	component,
	onUpdateComponent,
}: PropertyEditorProps) {
	if (!component) return null;

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		onUpdateComponent({
			...component,
			[e.target.name]: e.target.value,
		});
	};

	const handleSwitchChange = (name: string) => (checked: boolean) => {
		onUpdateComponent({
			...component,
			[name]: checked,
		});
	};

	return (
		<div className="w-64 bg-gray-100 p-4 overflow-y-auto">
			<h2 className="text-lg font-semibold mb-4">Properties</h2>
			<div className="space-y-4">
				{component.type === "Text" && (
					<>
						<div>
							<Label htmlFor="text">Text</Label>
							<Textarea
								id="text"
								name="text"
								value={component.text || ""}
								onChange={handleChange}
							/>
						</div>
						<div>
							<Label htmlFor="fontSize">Font Size</Label>
							<Input
								id="fontSize"
								name="fontSize"
								type="number"
								value={component.fontSize || ""}
								onChange={handleChange}
							/>
						</div>
					</>
				)}
				{component.type === "Button" && (
					<>
						<div>
							<Label htmlFor="text">Button Text</Label>
							<Input
								id="text"
								name="text"
								value={component.text || ""}
								onChange={handleChange}
							/>
						</div>
						<div>
							<Label htmlFor="href">Button Link</Label>
							<Input
								id="href"
								name="href"
								value={component.href || ""}
								onChange={handleChange}
							/>
						</div>
					</>
				)}
				{component.type === "Image" && (
					<>
						<div>
							<Label htmlFor="src">Image Source</Label>
							<Input
								id="src"
								name="src"
								value={component.src || ""}
								onChange={handleChange}
							/>
						</div>
						<div>
							<Label htmlFor="alt">Alt Text</Label>
							<Input
								id="alt"
								name="alt"
								value={component.alt || ""}
								onChange={handleChange}
							/>
						</div>
					</>
				)}
				<div>
					<Label htmlFor="width">Width</Label>
					<Input
						id="width"
						name="width"
						value={component.width || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						id="fullWidth"
						checked={component.fullWidth || false}
						onCheckedChange={handleSwitchChange("fullWidth")}
					/>
					<Label htmlFor="fullWidth">Full Width</Label>
				</div>
			</div>
		</div>
	);
}
