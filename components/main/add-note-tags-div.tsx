import React, { useContext } from "react";

import { NoteContext } from "@/data/contexts/note-context";

import Tag from "./tag";

type Props = {};

function AddNoteTagsDiv({}: Props) {
	const noteCtx = useContext(NoteContext);

	return (
		<div id="tagsDiv">
			{noteCtx!.loadedNoteState!.tags!.map((t) => (
				<Tag
					tag={t}
					key={t}
					dispatchLoadedNoteStateAction={noteCtx!.dispatchLoadedNoteStateAction}
					currentTags={noteCtx!.loadedNoteState!.tags!}
				/>
			))}
		</div>
	);
}

export default AddNoteTagsDiv;
