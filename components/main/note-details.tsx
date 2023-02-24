import React, { useContext } from "react";
import { NoteContext } from "@/data/contexts/note-context";

import Input from "../UI/input";

type Props = {};

function NoteDetails({}: Props) {
	const noteCtx = useContext(NoteContext);

	return (
		<div id="note-details">
			<Input
				id="add-new-note-details"
				label="Details"
				onChange={noteCtx!.setNoteDetails}
				type="textarea"
				value={noteCtx!.noteDetails}
			/>
		</div>
	);
}

export default NoteDetails;
