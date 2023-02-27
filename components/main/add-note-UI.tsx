import React from "react";

import NoteDetails from "./note-details";
import NoteDeleteDate from "./note-delete-day";
import NoteTags from "./note-tags";
import Card from "../UI/card";
import NoteTitle from "./add-note-title";
import AddNoteTagsDiv from "./add-note-tags-div";

function AddNoteUI() {
	return (
		<Card id="add-note-UI">
			<NoteTitle />
			<NoteDeleteDate />
			<NoteTags />
			<AddNoteTagsDiv />
			<NoteDetails />
		</Card>
	);
}

export default AddNoteUI;
