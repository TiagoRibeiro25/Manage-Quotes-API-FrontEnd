import axios from "axios";
import { useState } from "react";
import { QuoteFormProps } from "../../types/interfaces";
import { isInputValid } from "../../utils/checkElement";
import {
	getLocalStorage,
	removeLocalStorage,
	setLocalStorage,
} from "../../utils/localStorage";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import FormInput from "../FormInput/FormInput";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import "./index.css";

export default function AddQuoteForm(props: QuoteFormProps) {
	const [content, setContent] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [rememberAuthKey, setRememberAuthKey] = useState<boolean>(
		getLocalStorage("remember_auth_key") || false
	);
	const [authKey, setAuthKey] = useState<string>(
		rememberAuthKey ? getLocalStorage("auth_key") || "" : ""
	);
	const [message, setMessage] = useState<string>("");
	const [adding, setAdding] = useState<boolean>(false);

	const verifyForm = (): boolean => {
		if (!isInputValid(content)) {
			setMessage("Invalid Quote");
			return false;
		}
		if (!isInputValid(author)) {
			setMessage("Invalid Author");
			return false;
		}
		if (!isInputValid(authKey)) {
			setMessage("Invalid API Key");
			return false;
		}
		return true;
	};

	const resetForm = (): void => {
		setContent("");
		setAuthor("");
		if (!rememberAuthKey) setAuthKey("");
	};

	const addQuote = async (): Promise<void> => {
		setAdding(true);
		setLocalStorage("remember_auth_key", rememberAuthKey);
		if (rememberAuthKey) setLocalStorage("auth_key", authKey);
		else removeLocalStorage("auth_key");

		if (!verifyForm()) return setAdding(false);

		try {
			const response = await axios.post(
				"https://get-quotes-api.cyclic.app/api/quotes",
				{ author, content },
				{ headers: { auth_key: authKey, "Content-Type": "application/json" } }
			);

			setMessage(response.data.message);
			setAdding(false);
			resetForm();
			props.onSubmit();
		} catch (err: Error | any) {
			if (err.response.status === 401) setMessage("Invalid API Key");
			else if (err.response.status === 400) setMessage("Invalid Quote");
			else setMessage("Something went wrong, please try again later");
			setAdding(false);
		}
	};

	return (
		<div className="form-container mt-7 p-5 w-full rounded-lg shadow-md bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-opacity-50 flex flex-col items-center">
			<FormInput
				type="textarea"
				placeholder="Write your quote here..."
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>

			<FormInput
				type="input"
				placeholder="Author"
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
			/>

			<FormInput
				type="input"
				placeholder="API Authentication Key"
				value={authKey}
				onChange={(e) => setAuthKey(e.target.value)}
			/>

			<Checkbox
				label="Remember API Authentication Key"
				checked={rememberAuthKey}
				onChange={(e) => setRememberAuthKey(e.target.checked)}
			/>

			<div className="h-10 mt-10 flex justify-center items-center w-full">
				{adding ? (
					<LoadingIcon />
				) : (
					<span className="text-white text-xl text-center">{message}</span>
				)}
			</div>

			<div className="mt-6">
				<Button text="Add Quote" onClick={addQuote} isDisabled={adding} />
			</div>
		</div>
	);
}
