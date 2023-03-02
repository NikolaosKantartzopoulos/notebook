import { useContext, useEffect } from "react";

import { NoteContext } from "@/data/contexts/note-context";

import InputWithButton from "../UI/input-with-button";

interface Props {
	titleRef: React.MutableRefObject<HTMLInputElement | null>;
}

function NoteTitle({ titleRef }: Props) {
	const noteCtx = useContext(NoteContext);
	function handleTitleChange(e: any) {
		noteCtx!.dispatchLoadedNoteStateAction({
			type: "setLoadedNoteTitle",
			title: e,
		});
	}

	useEffect(() => {
		titleRef!.current!.focus();
	}, []);

	return (
		<div id="note-title" data-testid="note-title">
			<InputWithButton
				id="add-new-note"
				onChange={handleTitleChange}
				type="text"
				value={noteCtx!.loadedNoteState!.title}
				triggerFn={noteCtx!.addNote}
				placeholder="Title..."
				inputRef={titleRef}
			/>
		</div>
	);
}

export default NoteTitle;
