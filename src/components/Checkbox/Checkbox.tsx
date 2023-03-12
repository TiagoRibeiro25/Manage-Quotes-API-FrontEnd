import { CheckboxProps } from "../../types/interfaces";

export default function Checkbox(props: CheckboxProps) {
	const id = crypto.randomUUID();

	return (
		<div className="flex items-center mt-4 w-full ml-4">
			<input
				id={id}
				type="checkbox"
				value={props.checked ? "true" : "false"}
				className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
				onChange={props.onChange}
			/>
			<label htmlFor={id} className="ml-2 text-sm font-medium  text-gray-300">
				{props.label}
			</label>
		</div>
	);
}
