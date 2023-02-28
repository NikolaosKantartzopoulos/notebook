import React, { useContext, useEffect, useState } from "react";
import { VariablesContext } from "@/data/contexts/variables-context";

type Props = { children?: JSX.Element | JSX.Element[] };

function Info({ children }: Props) {
	const varCtx = useContext(VariablesContext);
	const [infoVisible, setInfoVisibility] = useState(true);

	// useEffect(() => {
	// 	setInfoVisibility(true);
	// 	setTimeout(() => {
	// 		varCtx!.setInfo(null);
	// 		setInfoVisibility(false);
	// 	}, 2500);
	// }, []);

	if (infoVisible) {
		return (
			<p
				id="info-panel"
				style={{
					backgroundColor:
						varCtx?.info?.type === "green"
							? "green"
							: varCtx?.info?.type === "orange"
							? "orange"
							: "darkred",
				}}
			>
				{varCtx?.info?.text}
			</p>
		);
	} else {
		return null;
	}
}

export default Info;
