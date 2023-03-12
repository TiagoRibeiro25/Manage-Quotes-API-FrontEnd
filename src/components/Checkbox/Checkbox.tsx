import { CheckboxProps } from "../../types/interfaces";

export default function Checkbox(props: CheckboxProps) {
	const id = crypto.randomUUID();

	return (
		<div className="flex items-center mt-4 w-full ml-4">
			<input
				id={id}
				type="checkbox"
				value={props.checked ? "true" : "false"}
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
				onChange={props.onChange}
			/>
			<label
				htmlFor={id}
				className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>
				{props.label}
			</label>
		</div>
	);
}
