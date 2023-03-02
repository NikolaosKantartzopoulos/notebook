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
	deleteNote: (_id: string) => void;
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

	async function addNote(): Promise<void> {
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

		const postRes = await fetch("/api/manage-notes", {
			method: "POST",
			headers: {
				"Context-Type": "application-json",
			},
			body: JSON.stringify(newNote),
		});

		if (postRes.ok) {
			const postData = await postRes.json();
			newNote._id = postData._id;
		}

		setNotesArray((prev) => [...prev, newNote]);
		dispatchLoadedNoteStateAction({ type: "clearAllInputs" });
		varCtx?.setInfo({ text: "Note submited!", type: TypeOfInfo.ok });
		varCtx?.setAddNoteUIVisible(false);
	}

	async function deleteNote(_id: string) {
		const deleteRes = await fetch("/api/manage-notes", {
			method: "DELETE",
			headers: { "Content-Type": "text/plain" },
			body: _id,
		});
		console.log(deleteRes);
		if (deleteRes.ok) {
			const data = await deleteRes.json();
			setNotesArray((notesArray) =>
				notesArray.filter((note) => note._id !== data._id)
			);
			console.log(data);
		}
	}

	const noteContext = {
		addNote,
		dispatchLoadedNoteStateAction,
		loadedNoteState,
		notesArray,
		setNotesArray,
		deleteNote,
	};

	return (
		<NoteContext.Provider value={noteContext}>{children}</NoteContext.Provider>
	);
}

export default NoteContextProvider;
