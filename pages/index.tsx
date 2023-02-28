import { useContext } from "react";
import { NoteContext } from "@/data/contexts/note-context";

import Head from "next/head";

import AddNoteUI from "@/components/main/add-note-UI";
import NotesLibrary from "@/components/main/notes-library";
import Info from "@/components/UI/info";

export default function Home() {
	const noteCtx = useContext(NoteContext!);

	return (
		<main id="home-page">
			<Head>
				<title>Notebook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Info />
				<AddNoteUI />
				<NotesLibrary />
			</main>
		</main>
	);
}
