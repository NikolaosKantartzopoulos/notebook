import React from "react";

type Props = { children?: JSX.Element | JSX.Element[] };

function Card({ children }: Props) {
	return <div className="card">{children}</div>;
}

export default Card;
