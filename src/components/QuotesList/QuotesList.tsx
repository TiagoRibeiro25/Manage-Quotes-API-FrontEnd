import axios from "axios";
import { useEffect, useState } from "react";
import { Quote, QuotesListProps } from "../../types/interfaces";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import QuoteInfo from "../QuoteInfo/QuoteInfo";
import "./index.css";

export default function QuotesList(props: QuotesListProps) {
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		axios
			.get("https://get-quotes-api.cyclic.app/api/quotes")
			.then((res) => {
				setQuotes(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, []);

	let content = null;
	if (loading) content = <LoadingIcon />;
	else {
		const filteredQuotes = quotes.filter((quote) => {
			const searchRegex = new RegExp(props.searchInput, "i");
			return searchRegex.test(quote.content) || searchRegex.test(quote.author);
		});

		if (filteredQuotes.length === 0)
			content = (
				<p className="text-white text-center text-2xl font-bold">No quotes found.</p>
			);
		else {
			content = filteredQuotes.map((quote) => {
				return (
					<QuoteInfo
						key={quote.content}
						author={quote.author}
						content={quote.content}
					/>
				);
			});
		}
	}

	const containerClasses =
		quotes.length === 0 ? "quotes-container justify-center" : "quotes-container";

	return (
		<div
			className={`${containerClasses} mt-6 p-5 w-full rounded-lg overflow-y-auto shadow-md bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-opacity-50 flex flex-col items-center`}
		>
			{content}
		</div>
	);
}
