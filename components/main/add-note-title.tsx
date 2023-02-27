import { useContext } from "react";

import { NoteContext } from "@/data/contexts/note-context";

import InputWithButton from "../UI/input-with-button";

type Props = {};

function NoteTitle({}: Props) {
	const noteCtx = useContext(NoteContext);
	function handleTitleChange(e: any) {
		noteCtx!.dispatchLoadedNoteStateAction({
			type: "setLoadedNoteTitle",
			title: e,
		});
	}

	return (
		<div id="note-title">
			<InputWithButton
				id="add-new-note"
				onChange={handleTitleChange}
				type="text"
				value={noteCtx!.loadedNoteState!.title}
				triggerFn={noteCtx!.addNote}
				placeholder="Title..."
			/>
		</div>
	);
}

export default NoteTitle;
