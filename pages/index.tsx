import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { VariablesContext } from "@/data/contexts/variables-context";
import { NoteContext } from "@/data/contexts/note-context";

import Head from "next/head";
import { GetServerSideProps } from "next";
import Image from "next/image";

import Note from "@/data/interfaces/note.model";

import { connectDatabase } from "@/data/helper-functions/databaseFn";

import AddNoteUI from "@/components/main/add-note-UI";
import NotesLibrary from "@/components/main/notes-library";
import Info from "@/components/UI/info";

import plusImage from "@/public/assets/images/plus-circle.svg";

interface Props {
	notes: Note[];
}

export default function Home({ notes }: Props) {
	const varCtx = useContext(VariablesContext!);
	const noteCtx = useContext(NoteContext!);

	const ref = useRef<Element | null>(null);
	const titleRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		noteCtx?.setNotesArray(notes);
		ref.current = document.querySelector<HTMLElement>("#backdrop-root");
	}, []);

	return (
		<main id="home-page">
			<Head>
				<title>Notebook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{varCtx?.info && <Info />}
			{varCtx?.addNoteUIVisible && <AddNoteUI titleRef={titleRef} />}
			<NotesLibrary />
			{!varCtx?.addNoteUIVisible && (
				<Image
					src={plusImage}
					alt="Add new Event button"
					id="add-new-event-button"
					onClick={() => varCtx?.setAddNoteUIVisible(true)}
					height={64}
					width={64}
					data-testid="plus-img"
				/>
			)}
			{ref.current && varCtx?.addNoteUIVisible
				? createPortal(
						<div
							id="backdrop-division"
							onClick={() => {
								varCtx?.setAddNoteUIVisible(false);
								noteCtx?.dispatchLoadedNoteStateAction({
									type: "clearAllInputs",
								});
							}}
						/>,
						ref.current
				  )
				: null}
		</main>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const { client, db } = await connectDatabase();

	const delRes = await db
		.collection("notes")
		.deleteMany({ deleteDate: { $lte: new Date().toISOString() } });

	const allNotes = await db.collection("notes").find().toArray();

	const notes = allNotes.map((note) => ({
		...note,
		_id: note._id.toString(),
	}));

	return {
		props: {
			notes,
		},
	};
};
