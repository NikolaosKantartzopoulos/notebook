import React from "react";

import Note from "@/data/interfaces/note-interface";

import Image from "next/image";

import blueBG from "@/public/assets/images/blue.jpg";

interface Props {
	note: Note;
}

function ListItem({ note }: Props) {
	return (
		<li>
			<p>{note.title}</p>
			<div>
				{/* <span>
					<>Created: {note.addDate}</>
				</span>
				<span>
					<>Delete on: {note.deleteDate}</>
				</span>
				{note.tags && (
					<div>
						{note.tags.map((t) => (
							<p key={t}>{t}</p>
						))}
					</div>
				)}
				<div>{note.details}</div> */}
				<Image src={blueBG} alt="Blue Background" width={320} height={64} />
			</div>
		</li>
	);
}

export default ListItem;
