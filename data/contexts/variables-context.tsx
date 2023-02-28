import React, { createContext, useState } from "react";
import {
	informationBlock,
	VariablesContextType,
} from "../interfaces/variables.model";

export const VariablesContext = createContext<VariablesContextType | null>(
	null
);

interface Props {
	children?: JSX.Element | JSX.Element[];
}

function VariablesContextProvider({ children }: Props) {
	const [info, setInfo] = useState<informationBlock | null>(null);

	const variablesContext = { info, setInfo };

	return (
		<VariablesContext.Provider value={variablesContext}>
			{children}
		</VariablesContext.Provider>
	);
}

export default VariablesContextProvider;
