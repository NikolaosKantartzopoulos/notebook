import { useState, createContext, useReducer, useContext } from "react";

import { VariablesContext } from "./variables-context";
import { loadedNoteReducer, sampleLoadedNote } from "../reducers/note-reducer";

import Note from "../interfaces/note.model";
import { informationBlock, TypeOfInfo } from "../interfaces/variables.model";

import { getAllNoteTitles } from "../helper-functions/note-context-helper";

export const NoteContext = createContext<NoteContextType | null>(null);

interface NoteContextType {
	loadedNoteState: Note | null;
	dispatchLoadedNoteStateAction: React.Dispatch<any>;
	notesArray: Note[] | [];
	setNotesArray: React.Dispatch<React.SetStateAction<Note[]>>;
	addNote: () => void;
	deleteNote: (_id: string) => void;
	editNote: () => void;
	prepareNoteEdit: (note: Note) => void;
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

	const [editedNoteBuffer, setEditedNoteBuffer] = useState<Note | null>(null);

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

		setNotesArray((prev) => [...prev, newNote]);
		dispatchLoadedNoteStateAction({ type: "clearAllInputs" });
		varCtx?.setAddNoteUIVisible(false);

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

			setNotesArray((prev) => [
				...prev.filter((n) => n.title != newNote.title),
			]);
			setNotesArray((prev) => [...prev, newNote]);
			varCtx?.setInfo({ text: "Note submited!", type: TypeOfInfo.ok });
		} else {
			setNotesArray((prev) => [
				...prev.filter((n) => n.title != newNote.title),
			]);
		}
	}

	function prepareNoteEdit(note: Note): void {
		setEditedNoteBuffer(note);
		dispatchLoadedNoteStateAction({ type: "loadNote", note: note });
		varCtx?.setAddNoteUIVisible(true);
	}

	async function editNote(): Promise<void> {
		if (loadedNoteState.title.trim() === "") {
			varCtx?.setInfo({ text: "Title field is empty", type: TypeOfInfo.error });
			return;
		}

		let filteredArray = notesArray.filter(
			(note) => note._id !== editedNoteBuffer!._id!
		);

		setNotesArray([...filteredArray, loadedNoteState]);
		dispatchLoadedNoteStateAction({ type: "clearAllInputs" });
		varCtx?.setAddNoteUIVisible(false);

		const patchRes = await fetch("/api/manage-notes", {
			method: "PATCH",
			headers: {
				"Context-Type": "application-json",
			},
			body: JSON.stringify(loadedNoteState),
		});

		const newNote = loadedNoteState;

		if (patchRes.ok) {
			const patchResData: informationBlock = await patchRes.json();
			varCtx?.setInfo({ text: patchResData.text, type: TypeOfInfo.ok });
		} else {
			setNotesArray((notesArray) =>
				notesArray.filter((note) => note._id !== editedNoteBuffer!._id!)
			);
			setNotesArray((prev) => [...prev, editedNoteBuffer!]);
		}
	}

	async function deleteNote(_id: string) {
		const initialNotes = notesArray;
		setNotesArray((notesArray) =>
			notesArray.filter((note) => note._id !== _id)
		);
		const deleteRes = await fetch("/api/manage-notes", {
			method: "DELETE",
			headers: { "Content-Type": "text/plain" },
			body: _id,
		});

		if (deleteRes.ok) {
			const data = await deleteRes.json();
			setNotesArray(() => initialNotes.filter((note) => note._id !== data._id));
			varCtx?.setInfo({ text: "Note deleted!", type: TypeOfInfo.ok });
		}
	}

	const noteContext = {
		addNote,
		dispatchLoadedNoteStateAction,
		loadedNoteState,
		notesArray,
		setNotesArray,
		deleteNote,
		editNote,
		prepareNoteEdit,
	};

	return (
		<NoteContext.Provider value={noteContext}>{children}</NoteContext.Provider>
	);
}

export default NoteContextProvider;
