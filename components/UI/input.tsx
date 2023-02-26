import React, { useLayoutEffect, useRef, useState } from "react";

interface Props {
	id: string;
	label?: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	type: string;
	value: string | number;
	inputWidth?: string;
	inputRef?: React.Ref<HTMLInputElement> | null;
}

function Input({
	type = "text",
	label,
	id,
	onChange,
	value,
	inputWidth,
	inputRef,
}: Props) {
	if (type == "textarea") {
		return (
			<div className="input-div-textarea">
				<textarea
					id={id}
					onChange={(e) => onChange(e.target.value)}
					value={value}
					rows={5}
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
			/>
		</div>
	);
}

export default Input;
