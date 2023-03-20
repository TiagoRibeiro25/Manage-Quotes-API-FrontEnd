import { useState } from "react";
import { QuoteOptionsProps } from "../../types/interfaces";
import { isInputValid } from "../../utils/checkElement";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import ModalHeader from "./ModalHeader";

export default function QuoteOptions(props: QuoteOptionsProps) {
	const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
	const [authKey, setAuthKey] = useState<string>("");

	if (!props.isOpened) return <></>; // If the modal is not opened, return an empty fragment

	const handleCopyBtnClick = () => {
		props.onCopy();
		props.onClose();
	};

	const handleDeleteBtnClick = () => {
		setShowConfirmDelete(true);
	};

	const handleConfirmDeleteBtnClick = () => {
		props.onDelete(authKey);
	};

	const handleCancelDeleteBtnClick = () => {
		setShowConfirmDelete(false);
	};

	const handleCloseModal = () => {
		setShowConfirmDelete(false);
		props.onClose();
	};

	return (
		<div
			className={
				"fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-black bg-opacity-40"
			}
		>
			<div className="relative w-full h-full max-w-2xl md:h-auto mx-auto px-1 mt-[calc(50vh-15rem)]">
				<div className="relative rounded-lg shadow bg-gray-700">
					<ModalHeader title="Quote Options" onClose={handleCloseModal} />

					<div className="p-6 text-justify">
						<div className="w-full space-y-1 border border-gray-600 rounded-lg p-6 pb-8 bg-gray-800 mt-2">
							<span className="text-white text-base font-semibold">
								{props.quote?.content}
							</span>
							<span className="text-gray-400 text-sm font-medium float-right">
								{props.quote?.author}
							</span>
						</div>

						<div className="flex justify-center mt-8">
							<Button
								text="Copy to Clipboard"
								onClick={handleCopyBtnClick}
								isDisabled={false}
							/>
						</div>
						<div className="flex justify-center mt-4">
							{!showConfirmDelete ? (
								<Button
									text="Delete Quote"
									onClick={handleDeleteBtnClick}
									isDisabled={false}
								/>
							) : (
								<div className="w-full border border-gray-600 rounded-lg p-6 pb-8 bg-gray-800 mt-2">
									<h4 className="w-full text-white text-lg font-semibold text-center">
										Are you sure you want to delete this quote?
									</h4>
									<div className="flex justify-center">
										<FormInput
											type="input"
											placeholder="API Authentication Key"
											onChange={(e) => setAuthKey(e.target.value)}
											value={authKey}
										/>
									</div>
									{props.deleting && (
										<div className="flex justify-center mt-6 mb-7">
											<LoadingIcon />
										</div>
									)}
									<div className="flex justify-center mt-6">
										<div className="pr-2">
											<Button
												text="Confirm"
												onClick={handleConfirmDeleteBtnClick}
												isDisabled={props.deleting || !isInputValid(authKey)}
											/>
										</div>
										<div className="pl-2">
											<Button
												text="Cancel"
												onClick={handleCancelDeleteBtnClick}
												isDisabled={props.deleting}
											/>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
