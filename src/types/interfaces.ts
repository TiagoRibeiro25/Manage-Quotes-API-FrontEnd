export interface SearchInputProps {
	placeholder: string;
	onSearch: (query: string) => void;
}

export interface QuotesListProps {
	searchInput: string;
}

export interface Quote {
	_id: string;
	author: string;
	content: string;
}

export interface FormInputProps {
	type: "input" | "textarea";
	placeholder: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	value: string;
}

export interface CheckboxProps {
	label: string;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
	text: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	isDisabled: boolean;
}
