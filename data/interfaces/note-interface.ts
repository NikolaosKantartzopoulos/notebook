export default interface Note {
	title: string;
	addDate?: Date;
	deleteDate?: Date;
	details?: string;
	tags?: string[];
	children?: JSX.Element | JSX.Element[];
}
