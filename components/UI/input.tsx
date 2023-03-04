import React from "react";

interface Props {
	id: string;
	label?: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	type: string;
	value: string | number;
	inputWidth?: string;
	inputRef?: React.Ref<HTMLInputElement>;
	placeholder?: string;
}

function Input({
	type = "text",
	label,
	id,
	onChange,
	value,
	inputWidth,
	inputRef,
	placeholder,
}: Props) {
	if (type == "textarea") {
		return (
			<div className="input-div-textarea">
				<textarea
					id={id}
					onChange={(e) => onChange(e.target.value)}
					value={value}
					rows={5}
					placeholder={placeholder}
				/>
			</div>
		);
	}

	return (
		<div className="input-div">
			{label && <label htmlFor={id}>{label}</label>}
			<input
				type={type}
				id={id}
				onChange={(e) => onChange(e.target.value)}
				value={value}
				style={{ width: `${inputWidth! ? inputWidth : null}` }}
				ref={inputRef}
				placeholder={placeholder}
			/>
		</div>
	);
}

export default Input;
