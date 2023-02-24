import { useContext } from "react";
import { NoteContext } from "@/data/contexts/note-context";

import Head from "next/head";

import AddNoteUI from "@/components/main/add-note-UI";
import Note from "@/data/interfaces/note-interface";
import ListItem from "@/components/main/list-item";
import NotesLibrary from "@/components/main/notes-library";

export default function Home() {
	const noteCtx = useContext(NoteContext!);

	return (
		<main id="home-page">
			<Head>
				<title>Notebook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AddNoteUI />
			<NotesLibrary />
		</main>
	);
}
