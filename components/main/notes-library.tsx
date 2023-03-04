import React, { useContext } from "react";

import { NoteContext } from "@/data/contexts/note-context";

import Note from "@/data/interfaces/note.model";

import ListItem from "./list-item";

type Props = {};

function NotesLibrary({}: Props) {
	const noteCtx = useContext(NoteContext);

	return (
		<ul id="notes-library">
			{noteCtx!.notesArray.map((note: Note) => (
				<ListItem key={note.title} note={note} />
			))}
		</ul>
	);
}

export default NotesLibrary;
