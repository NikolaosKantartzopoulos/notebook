import React from "react";

import NoteDetails from "./note-details";
import NoteDeleteDate from "./note-delete-day";
import NoteTags from "./note-tags";
import NoteTitle from "./add-note-title";
import AddNoteTagsDiv from "./add-note-tags-div";

import Card from "../UI/card";

interface Props {
	titleRef: React.MutableRefObject<HTMLInputElement | null>;
}

function AddNoteUI({ titleRef }: Props) {
	return (
		<Card id="add-note-UI">
			<NoteTitle titleRef={titleRef} />
			<NoteDeleteDate />
			<NoteTags />
			<AddNoteTagsDiv />
			<NoteDetails />
		</Card>
	);
}

export default AddNoteUI;
