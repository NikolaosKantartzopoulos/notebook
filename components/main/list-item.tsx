import React, { Touch, useState } from "react";

import Note from "@/data/interfaces/note-interface";

interface Props {
	note: Note;
}

function ListItem({ note }: Props) {
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);

	function handleDeleteItem() {
		console.log(note._id);
	}

	function handleTouchStart(e: React.TouchEvent) {
		setTouchStart(e.targetTouches[0].clientX);
	}

	function handleTouchMove(e: React.TouchEvent) {
		setTouchEnd(e.targetTouches[0].clientX);
	}

	function handleTouchEnd() {
		if (touchStart - touchEnd > 150) {
			// do your stuff here for left swipe
		}

		if (touchStart - touchEnd < -150) {
			console.log(note._id);
		}
	}
	return (
		<li
			className="note-list-item"
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<div className="note-title">
				<h3 data-testid="noteTitle">{note.title}</h3>

				<div className="date-range">
					<p>{new Date(note.addDate!).toLocaleDateString("el-GR")} </p>
					<p>-</p>
					<p>{new Date(note.deleteDate!).toLocaleDateString("el-GR")}</p>
				</div>
			</div>
			<div>
				{note.details ? (
					<div className="note-details" data-testid="detailsTextarea">
						{note.details}
					</div>
				) : null}
			</div>
			<div className="list-item-tags-div">
				{note!.tags!.map((t) => (
					<p key={t} className="tagParagraph">
						{t}
					</p>
				))}
			</div>
			<div className="itemDeleteButton" onClick={handleDeleteItem}>
				x
			</div>
		</li>
	);
}

export default ListItem;
