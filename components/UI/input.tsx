import React from "react";

interface Props {
	id: string;
	label: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	type: string;
	value: string | number;
}

function Input({ type = "text", label, id, onChange, value }: Props) {
	if (type == "textarea") {
		return (
			<div className="input-div-textarea">
				<textarea
					id={id}
					onChange={(e) => onChange(e.target.value)}
					value={value}
					rows={5}
					cols={40}
				/>
			</div>
		);
	}

	return (
		<div className="input-div">
			<label htmlFor={id}>{label}</label>
			<input
				type={type}
				id={id}
				onChange={(e) => onChange(e.target.value)}
				value={value}
			/>
		</div>
	);
}

export default Input;
