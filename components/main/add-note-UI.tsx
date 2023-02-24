import React, { Dispatch, useContext } from "react";
import { NoteContext } from "@/data/contexts/note-context";

import InputWithButton from "../UI/input-with-button";
import NoteDetails from "./note-details";

function AddNoteUI() {
	const noteCtx = useContext(NoteContext);

	function handleTitleChange(e: any) {
		noteCtx!.dispatchLoadedNoteStateAction({
			type: "setLoadedNoteTitle",
			title: e,
		});
	}

	return (
		<div id="add-note-UI">
			<InputWithButton
				id="add-new-note"
				label="New Note"
				onChange={handleTitleChange}
				type="text"
				value={noteCtx!.loadedNoteState!.title}
				triggerFn={noteCtx!.addNote}
			/>
			<input
				type="date"
				placeholder="dd-mm-yyyy"
				onChange={(e) => console.log(e.target.value)}
			/>
			<NoteDetails />
		</div>
	);
}

export default AddNoteUI;
