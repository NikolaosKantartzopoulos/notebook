import { NoteContext } from "@/data/contexts/note-context";
import React, { useContext, useRef, useState } from "react";
import InputWithButton from "../UI/input-with-button";
import Tag from "./tag";

type Props = {};

function NoteTags({}: Props) {
	const noteCtx = useContext(NoteContext);
	const inputRef = useRef<HTMLInputElement>(null);

	const [tagInputValue, setTagInputValue] = useState("");

	function newTabHandler() {
		noteCtx?.dispatchLoadedNoteStateAction({
			type: "setLoadedNoteTags",
			tags: [...noteCtx!.loadedNoteState!.tags!, tagInputValue],
		});
		setTagInputValue("");
		inputRef!.current!.focus();
	}

	return (
		<div className="note-tags-component">
			<div className="tagsDiv">
				{noteCtx!.loadedNoteState!.tags!.map((t) => (
					<Tag
						tag={t}
						key={t}
						dispatchLoadedNoteStateAction={
							noteCtx!.dispatchLoadedNoteStateAction
						}
						currentTags={noteCtx!.loadedNoteState!.tags!}
					/>
				))}
			</div>
			{noteCtx!.loadedNoteState!.tags!.length < 3 && (
				<InputWithButton
					type="text"
					label="Tags"
					id="tags-input"
					onChange={setTagInputValue}
					text="+"
					value={tagInputValue}
					triggerFn={newTabHandler}
					inputWidth="5rem"
					style={{ maxWidth: "9rem" }}
					inputRef={inputRef}
				/>
			)}
		</div>
	);
}

export default NoteTags;
