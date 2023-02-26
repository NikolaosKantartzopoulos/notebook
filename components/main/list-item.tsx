import React from "react";

import Note from "@/data/interfaces/note-interface";
import Tag from "./tag";

interface Props {
	note: Note;
}

function ListItem({ note }: Props) {
	return (
		<li className="note-list-item">
			<h1 className="note-title">
				<h3 data-testid="noteTitle">{note.title}</h3>

				<div className="date-range">
					<p>{note.addDate!.toLocaleDateString("el-GR")} </p>
					<p>-</p>
					<p>{note.deleteDate!.toLocaleDateString("el-GR")}</p>
				</div>
			</h1>
			<div>
				<div className="note-details" data-testid="detailsTextarea">
					{note.details}
				</div>
			</div>
			<div className="list-item-tags-div">
				{note!.tags!.map((t) => (
					<p key={t} className="tagParagraph">
						{t}
					</p>
				))}
			</div>
		</li>
	);
}

export default ListItem;
