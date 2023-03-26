import { Quote } from "../types/interfaces";

export function copyQuote(title: string, message: string, quote: Quote) {
	navigator.clipboard.writeText(`${quote.content} - ${quote.author}`);

	const div = document.createElement("div");

	div.className =
		"quote-notification absolute top-0 right-0 mt-4 mr-3 p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex";

	div.setAttribute("role", "alert");

	div.innerHTML = `
		<span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
			${title.toLocaleUpperCase()}
		</span>
		<span class="font-semibold mr-2 text-left flex-auto">
			${message}
		</span>`;

	document.body.appendChild(div);

	setTimeout((): void => {
		div.remove();
	}, 3000);
}

export function deleteQuote(title: string, message: string) {
	const div = document.createElement("div");

	div.className =
		"quote-notification absolute top-0 right-0 mt-4 mr-3 p-2 bg-red-800 items-center text-red-100 leading-none lg:rounded-full flex lg:inline-flex";

	div.setAttribute("role", "alert");

	div.innerHTML = `
		<span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
			${title.toLocaleUpperCase()}
		</span>
		<span class="font-semibold mr-2 text-left flex-auto">
			${message}
		</span>`;

	document.body.appendChild(div);

	setTimeout((): void => {
		div.remove();
	}, 3000);
}
