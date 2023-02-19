import { useState, createContext, SetStateAction } from "react";
import Note from "../interfaces/note-interface";
import {
	getAllNoteTitles,
	clearAllInputs,
} from "../helper-functions/note-context-helper";

interface NoteContextType {
	newNoteTitle: string;
	setNewNoteTitle: React.Dispatch<SetStateAction<string>>;
	noteDetails: string;
	setNoteDetails: React.Dispatch<SetStateAction<string>>;
	notesArray: Note[] | [];
	setNotesArray: React.Dispatch<React.SetStateAction<Note[]>>;
	addNote: () => void;
}

export const NoteContext = createContext<NoteContextType | null>(null);

interface Props {
	children?: JSX.Element | JSX.Element[];
}

function NoteContextProvider({ children }: Props) {
	const [newNoteTitle, setNewNoteTitle] = useState<string>("");
	const [noteDetails, setNoteDetails] = useState<string>("");
	const [notesArray, setNotesArray] = useState<Note[]>([]);

	function addNote(): void {
		if (getAllNoteTitles(notesArray).includes(newNoteTitle)) return;
		let newNote: Note = {
			title: newNoteTitle,
			addDate: new Date(),
			details: noteDetails,
		};
		setNotesArray((prev) => [...prev, newNote]);
		clearAllInputs(setNewNoteTitle, setNoteDetails);
	}

	const noteContext = {
		newNoteTitle,
		setNewNoteTitle,
		noteDetails,
		setNoteDetails,
		notesArray,
		setNotesArray,
		addNote,
	};

	return (
		<NoteContext.Provider value={noteContext}>{children}</NoteContext.Provider>
	);
}

export default NoteContextProvider;
