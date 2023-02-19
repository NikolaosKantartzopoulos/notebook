import { useContext } from "react";

import Head from "next/head";

import Input from "@/components/UI/input";

import styles from "@/pages/index.module.css";
import InputWithButton from "@/components/UI/input-with-button";
import Note from "@/data/interfaces/note-interface";
import { NoteContext } from "@/data/contexts/note-context";

export default function Home() {
	const noteCtx = useContext(NoteContext!);

	return (
		<div className={styles.container}>
			<Head>
				<title>Notebook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>test</h1>
				<InputWithButton
					id="add-new-note"
					label="New Note"
					onChange={noteCtx!.setNewNoteTitle}
					type="text"
					value={noteCtx!.newNoteTitle}
					triggerFn={noteCtx!.addNote}
				/>
				<Input
					id="add-new-note-details"
					label="Details"
					onChange={noteCtx!.setNoteDetails}
					type="textarea"
					value={noteCtx!.noteDetails}
				/>
				<ul>
					{noteCtx!.notesArray.map((note: Note) => (
						<li key={note.title}>{note.title}</li>
					))}
				</ul>
			</main>
		</div>
	);
}
