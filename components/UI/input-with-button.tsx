import React from "react";
import Input from "./input";
import Button from "./button";

interface Props {
	id: string;
	label?: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	type: string;
	value: string | number;
	triggerFn: () => void;
	text?: string;
	style?: {};
	inputWidth?: string;
	inputRef?: React.Ref<HTMLInputElement> | null;
}

function InputWithButton({
	type = "text",
	label,
	id,
	onChange,
	value,
	text = "Submit",
	triggerFn,
	style,
	inputWidth,
	inputRef,
}: Props): JSX.Element {
	return (
		<div className="input-with-button" style={style}>
			<Input
				type={type}
				label={label}
				id={id}
				onChange={onChange}
				value={value}
				inputWidth={inputWidth}
				inputRef={inputRef}
			/>
			<Button text={text} triggerFn={triggerFn} />
		</div>
	);
}

export default InputWithButton;
