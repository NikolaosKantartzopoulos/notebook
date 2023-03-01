import { useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { VariablesContext } from "@/data/contexts/variables-context";

import Head from "next/head";

import AddNoteUI from "@/components/main/add-note-UI";
import NotesLibrary from "@/components/main/notes-library";
import Info from "@/components/UI/info";
import Image from "next/image";

import plusImage from "@/public/assets/images/plus-circle.svg";
import { NoteContext } from "@/data/contexts/note-context";

export default function Home() {
	const varCtx = useContext(VariablesContext!);
	const noteCtx = useContext(NoteContext!);
	const ref = useRef<Element | null>(null);

	useEffect(() => {
		ref.current = document.querySelector<HTMLElement>("#backdrop-root");
	}, []);

	return (
		<main id="home-page">
			<Head>
				<title>Notebook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				{varCtx?.info && <Info />}
				{varCtx?.addNoteUIVisible && <AddNoteUI />}
				<NotesLibrary />
			</div>
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
