import { useContext, useEffect } from "react";

import { NoteContext } from "@/data/contexts/note-context";

import InputWithButton from "../UI/input-with-button";
import { VariablesContext } from "@/data/contexts/variables-context";
import { loadedActionType } from "@/data/interfaces/variables.model";

interface Props {
	titleRef: React.MutableRefObject<HTMLInputElement | null>;
}

function NoteTitle({ titleRef }: Props) {
	const noteCtx = useContext(NoteContext);
	const varCtx = useContext(VariablesContext);

	function handleTitleChange(e: any) {
		noteCtx!.dispatchLoadedNoteStateAction({
			type: "setLoadedNoteTitle",
			title: e,
		});
	}

	useEffect(() => {
		titleRef!.current!.focus();
	}, []);

	return (
		<div id="note-title" data-testid="note-title">
			{varCtx?.loadedAction === loadedActionType.addNote && (
				<InputWithButton
					id="add-new-note"
					onChange={handleTitleChange}
					type="text"
					value={noteCtx!.loadedNoteState!.title}
					triggerFn={noteCtx!.addNote}
					placeholder="Title..."
					inputRef={titleRef}
				/>
			)}
			{varCtx?.loadedAction === loadedActionType.editNote && (
				<InputWithButton
					id="edit-new-note"
					onChange={handleTitleChange}
					type="text"
					value={noteCtx!.loadedNoteState!.title}
					triggerFn={noteCtx!.editNote}
					placeholder="Title..."
					inputRef={titleRef}
					text="Edit"
				/>
			)}
		</div>
	);
}

export default NoteTitle;
