import React, { useContext } from "react";

import { NoteContext } from "@/data/contexts/note-context";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";

type Props = {};

function NoteDeleteDate({}: Props) {
	const noteCtx = useContext(NoteContext);

	function deleteDayHandler(e: Date) {
		noteCtx!.dispatchLoadedNoteStateAction({
			type: "setLoadedNoteDeleteDate",
			deleteDate: e,
		});
	}

	return (
		<div id="note-delete-date">
			<p>Ends</p>
			<DatePicker
				dateFormat="dd/MM/yy"
				selected={noteCtx?.loadedNoteState?.deleteDate}
				onChange={deleteDayHandler}
				id="datepicker"
				minDate={subDays(new Date(), -1)}
			/>
		</div>
	);
}

export default NoteDeleteDate;
