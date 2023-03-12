import { ButtonProps } from "../../types/interfaces";

export default function SubmitButton(props: ButtonProps) {
	return (
		<button
			type="button"
			className="py-2.5 px-5 mb-2 mt-6 font-medium focus:outline-none  rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 transition-all duration-300 ease-in-out"
			onClick={props.onClick}
		>
			{props.text}
		</button>
	);
}
