import React from "react";

type Props = { text?: string; triggerFn: () => void };

function Button({ text = "Submit", triggerFn }: Props) {
	return <button onClick={triggerFn}>{text}</button>;
}

export default Button;
