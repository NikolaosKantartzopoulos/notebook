import React, { useContext } from "react";
import { NoteContext } from "@/data/contexts/note-context";

import ListItem from "./list-item";

import Note from "@/data/interfaces/note-interface";

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
