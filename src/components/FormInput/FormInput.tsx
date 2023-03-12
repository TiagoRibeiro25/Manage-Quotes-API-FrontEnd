import { FormInputProps } from "../../types/interfaces";

export default function FormInput(props: FormInputProps) {
	return props.type === "input" ? (
		<input
			type="text"
			className="block p-2.5 w-full text-lg rounded-lg bg-transparent border-2 border-gray-500 focus:outline-none focus:border-gray-400 transition duration-300 text-gray-300 focus:text-gray-200 mt-10"
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
		/>
	) : (
		<textarea
			className="quote-input block p-2.5 w-full text-lg rounded-lg bg-transparent border-2 border-gray-500 focus:outline-none focus:border-gray-400 transition duration-300 text-gray-300 focus:text-gray-200"
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
		></textarea>
	);
}
