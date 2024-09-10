"use client";

import { useState, useCallback } from "react";
import type { UndoRedoState, UndoRedoActions } from "@/types";

export function useUndo<T>(
	initialPresent: T,
): [T, (newPresent: T) => void, UndoRedoActions] {
	const [state, setState] = useState<UndoRedoState<T>>({
		past: [],
		present: initialPresent,
		future: [],
	});

	const canUndo = state.past.length !== 0;
	const canRedo = state.future.length !== 0;

	const undo = useCallback(() => {
		setState((prevState) => {
			const [newPresent, ...newPast] = prevState.past;
			return {
				past: newPast,
				present: newPresent as T,
				future: [prevState.present, ...prevState.future],
			};
		});
	}, []);

	const redo = useCallback(() => {
		setState((prevState) => {
			const [newPresent, ...newFuture] = prevState.future;
			return {
				past: [prevState.present, ...prevState.past],
				present: newPresent as T,
				future: newFuture,
			};
		});
	}, []);

	const set = useCallback((newPresent: T) => {
		setState((prevState) => ({
			past: [prevState.present, ...prevState.past],
			present: newPresent,
			future: [],
		}));
	}, []);

	return [state.present, set, { undo, redo, canUndo, canRedo }];
}
