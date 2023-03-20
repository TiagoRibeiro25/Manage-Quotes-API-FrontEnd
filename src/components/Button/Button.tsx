import { ButtonProps } from "../../types/interfaces";

export default function Button(props: ButtonProps) {
	return (
		<button
			type="button"
			className="py-2.5 px-5 font-medium focus:outline-none  rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
			onClick={props.onClick}
			disabled={props.isDisabled}
		>
			{props.text}
		</button>
	);
}
