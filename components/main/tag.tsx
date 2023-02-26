import React from "react";

type Props = {
	tag: string;
	dispatchLoadedNoteStateAction: React.Dispatch<any>;
	currentTags: string[];
};

function Tag({ tag, dispatchLoadedNoteStateAction, currentTags }: Props) {
	function clickHandler() {
		dispatchLoadedNoteStateAction({
			type: "setLoadedNoteTags",
			tags: currentTags.filter((t) => t !== tag),
		});
	}

	return (
		<div className="tag">
			{tag}
			<p className="close" onClick={clickHandler}>
				<span>x</span>
			</p>
		</div>
	);
}

export default Tag;
