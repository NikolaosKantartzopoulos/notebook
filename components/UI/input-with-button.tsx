import React from "react";
import Input from "./input";
import Button from "./button";

interface Props {
	id: string;
	label: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	type: string;
	value: string | number;
	triggerFn: () => void;
	text?: string;
}

function InputWithButton({
	type = "text",
	label,
	id,
	onChange,
	value,
	text = "Submit",
	triggerFn,
}: Props) {
	return (
		<>
			<Input
				type={type}
				label={label}
				id={id}
				onChange={onChange}
				value={value}
			/>
			<Button text={text} triggerFn={triggerFn} />
		</>
	);
}

export default InputWithButton;
