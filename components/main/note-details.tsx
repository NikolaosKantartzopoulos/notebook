import React, { useContext } from "react";
import { NoteContext } from "@/data/contexts/note-context";

import Input from "../UI/input";

type Props = {};

function NoteDetails({}: Props) {
	const noteCtx = useContext(NoteContext);

	function editDetailsHandler(e: any): void {
		noteCtx!.dispatchLoadedNoteStateAction({
			type: "setLoadedNoteDetails",
			details: e,
		});
		console.log(e);
	}

	return (
		<div id="note-details">
			<Input
				id="add-new-note-details"
				label="Details"
				onChange={editDetailsHandler}
				type="textarea"
				value={noteCtx!.loadedNoteState!.details!}
			/>
		</div>
	);
}

export default NoteDetails;
