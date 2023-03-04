import Note from "../interfaces/note.model";

export function getAllNoteTitles(notesArray: Note[]): string[] {
	return notesArray.map((note) => note.title);
}

export function clearAllInputs(
	setNewNoteTitle: React.Dispatch<React.SetStateAction<string>>,
	setNoteDetails: React.Dispatch<React.SetStateAction<string>>
): void {
	setNewNoteTitle("");
	setNoteDetails("");
}
