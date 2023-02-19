import React from "react";

import Note from "@/data/interfaces/note-interface";

type Props = Note;

function ListItem(Note: Props) {
	return (
		<li>
			<h1>{Note.title}</h1>
			<div>
				<span>
					<>Created: {Note.addDate}</>
				</span>
				<span>
					<>Delete on: {Note.deleteDate}</>
				</span>
				{Note.tags && (
					<div>
						{Note.tags.map((t) => (
							<p key={t}>{t}</p>
						))}
					</div>
				)}
				<div>{Note.details}</div>
			</div>
		</li>
	);
}

export default ListItem;
