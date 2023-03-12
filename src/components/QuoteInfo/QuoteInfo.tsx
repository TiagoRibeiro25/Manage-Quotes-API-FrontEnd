import { useState } from "react";
import { Quote } from "../../types/interfaces";
import "./index.css";

export default function QuoteInfo(props: Quote) {
	const [copied, setCopied] = useState<boolean>(false);

	const handleClick = () => {
		navigator.clipboard.writeText(props.content);
		setCopied(true);

		const div = document.createElement("div");
		div.className =
			"quote-notification absolute top-0 right-0 mt-4 mr-3 p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex";
		div.setAttribute("role", "alert");
		div.innerHTML = `
         <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
            Copied
         </span>
         <span class="font-semibold mr-2 text-left flex-auto">
            Quote copied to clipboard!
         </span>
      `;

		document.body.appendChild(div);

		setTimeout(() => {
			setCopied(false);

			setTimeout(() => {
				div.remove();
			}, 2000);
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
			<p className="text-right text-gray-400 text-sm font-semibold mt-2">
				{props.author}
			</p>
		</div>
	);
}
