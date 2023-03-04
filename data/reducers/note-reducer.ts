import Note from "../interfaces/note.model";

export function loadedNoteReducer(
	state: any,
	action: {
		type: string;
		title?: string;
		details?: string;
		addDate?: Date;
		deleteDate?: Date;
		tags?: string[];
	}
) {
	switch (action.type) {
		case "setLoadedNoteTitle":
			return { ...state, title: action.title };
		case "setLoadedNoteDetails":
			return { ...state, details: action.details };
		case "setLoadedNoteAddDate":
			return { ...state, addDate: action.addDate };
		case "setLoadedNoteDeleteDate":
			return { ...state, deleteDate: action.deleteDate };
		case "setLoadedNoteTags":
			return { ...state, tags: action.tags };
		case "clearAllInputs":
			return sampleLoadedNote;
	}
}

function nextWeek() {
	const nextWeek = new Date();
	nextWeek.setDate(new Date().getDate() + 7);
	return nextWeek;
}

export const sampleLoadedNote: Note = {
	title: "",
	details: "",
	addDate: null,
	deleteDate: nextWeek(),
	tags: [],
};
