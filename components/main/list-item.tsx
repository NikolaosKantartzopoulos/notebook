import React from "react";

import Note from "@/data/interfaces/note-interface";

interface Props {
	note: Note;
}

function ListItem({ note }: Props) {
	return (
		<li className="note-list-item">
			<p className="note-title">{note.title}</p>
			<div>
				<span>Created: {note.addDate!.toLocaleDateString("el-GR")}</span>
				{/* <span>
					<>Delete on: {note.deleteDate!.toISOString()}</>
				</span> */}
				{note.tags && (
					<div>
						{note.tags.map((t) => (
							<p key={t}>{t}</p>
						))}
					</div>
				)}
				<div className="note-details">{note.details}</div>
			</div>
		</li>
	);
}

export default ListItem;
