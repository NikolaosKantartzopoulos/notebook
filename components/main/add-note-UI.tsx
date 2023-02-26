import React, { useContext, useRef, useState } from "react";
import { NoteContext } from "@/data/contexts/note-context";

import InputWithButton from "../UI/input-with-button";
import NoteDetails from "./note-details";
import NoteDeleteDate from "./note-delete-day";
import NoteTags from "./note-tags";

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
			<div className="dateAndTagsDiv">
				<NoteDeleteDate />
				<InputWithButton
					id="add-new-note"
					onChange={handleTitleChange}
					type="text"
					value={noteCtx!.loadedNoteState!.title}
					triggerFn={noteCtx!.addNote}
				/>
			</div>
			<NoteTags />
			<NoteDetails />
		</div>
	);
}

export default AddNoteUI;
