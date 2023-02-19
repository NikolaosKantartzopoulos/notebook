import React from "react";

interface Props {
	id: string;
	label: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	type: string;
	value: string | number;
}

function Input({ type = "text", label, id, onChange, value }: Props) {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				type={type}
				id={id}
				onChange={(e) => onChange(e.target.value)}
				value={value}
			/>
		</>
	);
}

export default Input;
