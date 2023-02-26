import { useContext } from "react";
import { NoteContext } from "@/data/contexts/note-context";

import Head from "next/head";

import AddNoteUI from "@/components/main/add-note-UI";
import NotesLibrary from "@/components/main/notes-library";
import Card from "@/components/UI/card";

export default function Home() {
	const noteCtx = useContext(NoteContext!);

	return (
		<main id="home-page">
			<Head>
				<title>Notebook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Card>
				<AddNoteUI />
				<NotesLibrary />
			</Card>
		</main>
	);
}
