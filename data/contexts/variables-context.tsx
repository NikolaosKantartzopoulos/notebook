import React, { createContext, useState } from "react";

import {
	informationBlock,
	VariablesContextType,
	loadedActionType,
} from "../interfaces/variables.model";

export const VariablesContext = createContext<VariablesContextType | null>(
	null
);

interface Props {
	children?: JSX.Element | JSX.Element[];
}

function VariablesContextProvider({ children }: Props) {
	const [info, setInfo] = useState<informationBlock | null>(null);
	const [addNoteUIVisible, setAddNoteUIVisible] = useState(false);
	const [loadedAction, setLoadedAction] = useState<loadedActionType | null>(
		null
	);

	const variablesContext = {
		info,
		setInfo,
		addNoteUIVisible,
		setAddNoteUIVisible,
		loadedAction,
		setLoadedAction,
	};

	return (
		<VariablesContext.Provider value={variablesContext}>
			{children}
		</VariablesContext.Provider>
	);
}

export default VariablesContextProvider;
