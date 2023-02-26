import React from "react";

type Props = { id?: string; children?: JSX.Element | JSX.Element[] };

function Card({ id, children }: Props) {
	return (
		<div className="card" id={id}>
			{children}
		</div>
	);
}

export default Card;
