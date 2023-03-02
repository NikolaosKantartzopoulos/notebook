export default interface Note {
	title: string;
	addDate?: Date | null;
	deleteDate?: Date | null;
	details?: string;
	tags?: string[];
	children?: JSX.Element | JSX.Element[];
	_id?: string;
}
