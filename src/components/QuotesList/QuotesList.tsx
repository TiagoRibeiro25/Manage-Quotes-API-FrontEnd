import axios from "axios";
import { useEffect, useState } from "react";
import { Quote, QuotesListProps } from "../../types/interfaces";
import { copyQuote, deleteQuote } from "../../utils/notification";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import QuoteInfo from "../QuoteInfo/QuoteInfo";
import QuoteOptions from "../QuoteOptions/QuoteOptions";
import "./index.css";

export default function QuotesList(props: QuotesListProps) {
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
	const [selectedQuote, setSelectedQuote] = useState<Quote | undefined>(undefined);
	const [deleting, setDeleting] = useState<boolean>(false);

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
	}, [props.updateListDependency]);

	const handleQuoteClick = (id: string) => {
		const quote: Quote | undefined = quotes.find((quote) => quote._id === id);
		setSelectedQuote(quote);
		setIsModalOpened(true);
	};

	const handleCopy = () => {
		copyQuote("Copied", "Quote copied to clipboard.", selectedQuote!);
	};

	const handleDelete = async (authKey: string) => {
		setDeleting(true);
		try {
			const response = await axios.delete(
				`https://get-quotes-api.cyclic.app/api/quotes/${selectedQuote?._id}`,
				{ headers: { auth_key: authKey, "Content-Type": "application/json" } }
			);
			setQuotes(quotes.filter((quote) => quote._id !== selectedQuote?._id));

			if (response.status === 204) deleteQuote("Deleted", "Quote deleted successfully.");
		} catch (error: Error | any) {
			console.log(error);
			if (error.response.status === 401) deleteQuote("Error", "Invalid API Key.");
			else deleteQuote("Error", "Something went wrong.");
		} finally {
			setDeleting(false);
			handleCloseModal();
			setSelectedQuote(undefined);
		}
	};

	const handleCloseModal = () => setIsModalOpened(false);

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
						key={quote._id}
						id={quote._id}
						author={quote.author}
						content={quote.content}
						onClick={handleQuoteClick}
					/>
				);
			});
		}
	}

	const containerClasses =
		quotes.length === 0 ? "quotes-container justify-center" : "quotes-container";

	return (
		<>
			<div
				className={`${containerClasses} mt-6 p-5 w-full rounded-lg overflow-y-auto shadow-md bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-opacity-50 flex flex-col items-center`}
			>
				{content}
			</div>
			<QuoteOptions
				isOpened={isModalOpened}
				quote={selectedQuote}
				onCopy={handleCopy}
				onDelete={handleDelete}
				onClose={handleCloseModal}
				deleting={deleting}
			/>
		</>
	);
}
