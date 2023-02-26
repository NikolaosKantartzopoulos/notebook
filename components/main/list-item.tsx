import React from "react";

import Note from "@/data/interfaces/note-interface";
import Tag from "./tag";

interface Props {
	note: Note;
}

function ListItem({ note }: Props) {
	console.log(note);
	return (
		<li className="note-list-item">
			<p className="note-title">{note.title}</p>
			<div>
				<div className="date-range">
					<p>{note.addDate!.toLocaleDateString("el-GR")} </p>
					<p>-</p>
					<p>{note.deleteDate!.toLocaleDateString("el-GR")}</p>
				</div>
				{/* <div>
					{note!.tags!.map((t) => (
						<p key={t}>{t}</p>
					))}
				</div> */}
				<div className="note-details">{note.details}</div>
			</div>
		</li>
	);
}

export default ListItem;
