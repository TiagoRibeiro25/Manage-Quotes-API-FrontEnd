import { QuoteProps } from "../../types/interfaces";
import "./index.css";

export default function QuoteInfo(props: QuoteProps) {
	return (
		<div
			className={`quote w-full mb-10 p-3 border rounded-md border-gray-900 hover:bg-gray-900 hover:border-gray-800 hover:shadow-md transition duration-500 ease-in-out cursor-pointer`}
			onClick={() => props.onClick(props.id)}
		>
			<h2 className="text-lg font-semibold text-start text-gray-100">{props.content}</h2>
			<div className="flex justify-between">
				<p className="text-left text-gray-400 text-sm font-semibold mt-2">{props.id}</p>
				<p className="text-right text-gray-400 text-sm font-semibold mt-2">{props.author}</p>
			</div>
		</div>
	);
}
