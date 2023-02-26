import React, { useContext, useRef, useState } from "react";
import { NoteContext } from "@/data/contexts/note-context";

import InputWithButton from "../UI/input-with-button";
import NoteDetails from "./note-details";
import NoteDeleteDate from "./note-delete-day";
import NoteTags from "./note-tags";
import Card from "../UI/card";

function AddNoteUI() {
	const noteCtx = useContext(NoteContext);

	function handleTitleChange(e: any) {
		noteCtx!.dispatchLoadedNoteStateAction({
			type: "setLoadedNoteTitle",
			title: e,
		});
	}

	return (
		<Card id="add-note-UI">
			<div className="dateAndTagsDiv">
				<NoteDeleteDate />
				<InputWithButton
					id="add-new-note"
					onChange={handleTitleChange}
					type="text"
					value={noteCtx!.loadedNoteState!.title}
					triggerFn={noteCtx!.addNote}
					placeholder="Title..."
				/>
			</div>
			<NoteTags />
			<NoteDetails />
		</Card>
	);
}

export default AddNoteUI;
