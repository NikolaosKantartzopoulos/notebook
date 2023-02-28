import { useState, createContext, useReducer, useContext } from "react";
import Note from "../interfaces/note-interface";
import { getAllNoteTitles } from "../helper-functions/note-context-helper";
import { loadedNoteReducer, sampleLoadedNote } from "../reducers/note-reducer";
import { informationBlock, TypeOfInfo } from "../interfaces/variables.model";
import { VariablesContext } from "./variables-context";

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
	info?: informationBlock;
	setInfo?: React.Dispatch<React.SetStateAction<informationBlock | null>>;
}

function NoteContextProvider({ children, info, setInfo }: Props) {
	const varCtx = useContext(VariablesContext);

	const [loadedNoteState, dispatchLoadedNoteStateAction] = useReducer(
		loadedNoteReducer,
		sampleLoadedNote
	);

	const [notesArray, setNotesArray] = useState<Note[] | []>([]);

	function addNote(): void {
		if (loadedNoteState.title.trim() === "") {
			varCtx?.setInfo({ text: "Title field is empty", type: TypeOfInfo.error });
			return;
		}

		if (getAllNoteTitles(notesArray).includes(loadedNoteState.title)) {
			varCtx?.setInfo({ text: "Title already exists", type: TypeOfInfo.error });
			return;
		}

		let newNote: Note = {
			title: loadedNoteState.title,
			addDate: new Date(),
			deleteDate: loadedNoteState.deleteDate
				? loadedNoteState.deleteDate
				: null,
			details:
				loadedNoteState.details.trim() === "" ? null : loadedNoteState.details,
			tags: loadedNoteState.tags,
		};

		setNotesArray((prev) => [...prev, newNote]);
		dispatchLoadedNoteStateAction({ type: "clearAllInputs" });
		varCtx?.setInfo({ text: "Note submited!", type: TypeOfInfo.ok });
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
