import { useState } from "react";
import { Quote } from "../../types/interfaces";
import { showNotification } from "../../utils/showNotification";
import "./index.css";

export default function QuoteInfo(props: Quote) {
	const [copied, setCopied] = useState<boolean>(false);

	const handleClick = () => {
		navigator.clipboard.writeText(props.content);
		setCopied(true);

		showNotification("copied", "Quote copied to clipboard!");

		setTimeout(() => {
			setCopied(false);
		}, 500);
	};

	return (
		<div
			className={`quote w-full mb-10 p-3 border rounded-md border-gray-900 hover:bg-gray-900 hover:border-gray-800 hover:shadow-md transition duration-500 ease-in-out cursor-pointer${
				copied ? " animate-blink" : ""
			}`}
			onClick={handleClick}
		>
			<h2 className="text-lg font-semibold text-start text-gray-100">{props.content}</h2>
			<div className="flex justify-between">
				<p className="text-left text-gray-400 text-sm font-semibold mt-2">{props._id}</p>
				<p className="text-right text-gray-400 text-sm font-semibold mt-2">
					{props.author}
				</p>
			</div>
		</div>
	);
}
