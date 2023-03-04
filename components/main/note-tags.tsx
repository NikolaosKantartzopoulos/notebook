import React, { useContext, useRef, useState } from "react";

import { NoteContext } from "@/data/contexts/note-context";

import InputWithButton from "../UI/input-with-button";

type Props = {};

function NoteTags({}: Props) {
	const noteCtx = useContext(NoteContext);
	const inputRef = useRef<HTMLInputElement>(null);

	const [tagInputValue, setTagInputValue] = useState("");

	function newTagHandler() {
		if (tagInputValue.trim() == "") return;
		noteCtx?.dispatchLoadedNoteStateAction({
			type: "setLoadedNoteTags",
			tags: [...noteCtx!.loadedNoteState!.tags!, tagInputValue],
		});
		setTagInputValue("");
		inputRef!.current!.focus();
	}

	return (
		<div id="note-tags-component">
			{noteCtx!.loadedNoteState!.tags!.length < 3 && (
				<InputWithButton
					type="text"
					label="Tags"
					id="tags-input"
					onChange={(e) => {
						if (tagInputValue.length >= 8) return;
						//@ts-ignore
						setTagInputValue(e);
					}}
					text="+"
					value={tagInputValue}
					triggerFn={newTagHandler}
					inputWidth="5rem"
					style={{ maxWidth: "9rem" }}
					inputRef={inputRef}
				/>
			)}
		</div>
	);
}

export default NoteTags;
