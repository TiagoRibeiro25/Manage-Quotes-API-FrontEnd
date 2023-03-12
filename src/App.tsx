import { useState } from "react";
import AddQuoteForm from "./components/AddQuoteForm/AddQuoteForm";
import QuotesList from "./components/QuotesList/QuotesList";
import SearchInput from "./components/SearchInput/SearchInput";

function App() {
	const [searchInput, setSearchInput] = useState<string>("");

	const handleSearch = (query: string) => {
		setSearchInput(query);
	};

	return (
		<div className="App">
			<div className="container mx-auto px-5">
				<header className="w-full h-20 flex justify-center items-center">
					<h1 className="text-4xl font-bold text-white text-center">
						Manage Quotes API
					</h1>
				</header>
				<hr />
				<main className="mt-12 pt-6">
					<div className="w-full lg:w-1/2 lg:pr-12 float-left flex justify-center items-center flex-wrap pb-10">
						<SearchInput placeholder="Search..." onSearch={handleSearch} />
						<QuotesList searchInput={searchInput} />
					</div>
					<div className="w-full lg:w-1/2 lg:pr-12 lg:mt-0 mt-6 float-right flex justify-center items-center flex-wrap pb-10">
						<h2 className="w-full text-3xl font-bold text-white text-center">
							Add New Quote
						</h2>
						<AddQuoteForm />
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
