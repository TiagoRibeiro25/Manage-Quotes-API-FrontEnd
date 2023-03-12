import { useState } from "react";
import { SearchInputProps } from "../../types/interfaces";
import "./index.css";

export default function SearchInput(props: SearchInputProps) {
	const [searchInput, setSearchInput] = useState<string>("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
		props.onSearch(e.target.value);
	};

	return (
		<input
			type="text"
			className="w-full h-10 px-3 text-base text-white placeholder-gray-400 rounded-lg focus:shadow-outline focus:outline-none bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-opacity-50"
			placeholder={props.placeholder}
			value={searchInput}
			onChange={handleInputChange}
		/>
	);
}
