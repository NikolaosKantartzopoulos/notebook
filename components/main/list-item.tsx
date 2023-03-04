import React, { useContext, useRef, useState } from "react";

import Note from "@/data/interfaces/note.model";
import { NoteContext } from "@/data/contexts/note-context";

import Image from "next/image";

// import editFileImage from "@/public/assets/images/file-edit-outline.svg";
import deleteFileImage from "@/public/assets/images/delete-forever-outline.svg";

interface Props {
	note: Note;
}

function ListItem({ note }: Props) {
	const noteCtx = useContext(NoteContext);
	const listItem = useRef<React.MutableRefObject<HTMLElement> | null>(null);

	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);

	function handleDeleteItem() {
		noteCtx?.deleteNote(note!._id!);
	}

	function handleTouchStart(e: React.TouchEvent) {
		setTouchStart(e.targetTouches[0].clientX);
	}

	function handleTouchMove(e: React.TouchEvent) {
		setTouchEnd(e.targetTouches[0].clientX);
	}

	function handleTouchEnd() {
		if (touchStart - touchEnd < 150 && touchStart - touchEnd > -150) {
			//@ts-ignore
			listItem!.current!.style!.left = 0;
		}
		if (touchStart - touchEnd > 150) {
			handleDeleteItem();
			//@ts-ignore
			listItem!.current!.style!.left = "-80%";
		}

		if (touchStart - touchEnd < -150) {
			handleDeleteItem();
			//@ts-ignore
			listItem!.current!.style!.left = "80%";
		}
	}

	return (
		<li className="note-list-item">
			<div
				className="list-item-foreground"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				style={{ left: touchEnd - touchStart }}
				//@ts-ignore
				ref={listItem}
			>
				<div className="note-title">
					<div className="list-item-title-and-date">
						<h3 data-testid="noteTitle">{note.title}</h3>
						<div className="date-range">
							<p>{new Date(note.addDate!).toLocaleDateString("el-GR")} </p>
							<p>-</p>
							<p>{new Date(note.deleteDate!).toLocaleDateString("el-GR")}</p>
						</div>
					</div>
					<div className="itemDeleteButton" onClick={handleDeleteItem}>
						x
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
			</div>
			<div className="list-item-background">
				<Image src={deleteFileImage} alt="delete-icon" width={64} height={64} />
				<Image src={deleteFileImage} alt="delete-icon" width={64} height={64} />
			</div>
		</li>
	);
}

export default ListItem;
