export enum TypeOfInfo {
	ok = "green",
	neutral = "orange",
	error = "darkred",
}

export interface informationBlock {
	text: string;
	type: TypeOfInfo;
}

export interface VariablesContextType {
	info: informationBlock | null;
	setInfo: React.Dispatch<React.SetStateAction<informationBlock | null>>;
	addNoteUIVisible: boolean;
	setAddNoteUIVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
