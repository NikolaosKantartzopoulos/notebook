import { useState, createContext, SetStateAction, useReducer } from "react";
import Note from "../interfaces/note-interface";
import { getAllNoteTitles } from "../helper-functions/note-context-helper";
import { loadedNoteReducer, sampleLoadedNote } from "../reducers/note-reducer";

export const NoteContext = createContext<NoteContextType | null>(null);

interface NoteContextType {
	loadedNoteState: Note | null;
	dispatchLoadedNoteStateAction: React.Dispatch<any>;
	notesArray: Note[] | [];
	setNotesArray: React.Dispatch<React.SetStateAction<Note[]>>;
	addNote: () => void;
}

interface Props {
	children?: JSX.Element | JSX.Element[];
}

function NoteContextProvider({ children }: Props) {
	const [loadedNoteState, dispatchLoadedNoteStateAction] = useReducer(
		loadedNoteReducer,
		sampleLoadedNote
	);

	const [notesArray, setNotesArray] = useState<Note[] | []>([]);

	function addNote(): void {
		if (getAllNoteTitles(notesArray).includes(loadedNoteState.title)) return;
		let newNote: Note = {
			title: loadedNoteState.title,
			addDate: new Date(),
			deleteDate: loadedNoteState.deleteDate,
			details: loadedNoteState.details,
			tags: loadedNoteState.tags,
		};
		setNotesArray((prev) => [...prev, newNote]);
		dispatchLoadedNoteStateAction({ type: "clearAllInputs" });
	}

	const noteContext = {
		addNote,
		dispatchLoadedNoteStateAction,
		loadedNoteState,
		notesArray,
		setNotesArray,
	};

	return (
		<NoteContext.Provider value={noteContext}>{children}</NoteContext.Provider>
	);
}

export default NoteContextProvider;
