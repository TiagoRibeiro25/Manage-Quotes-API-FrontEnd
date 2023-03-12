export function isInputValid(inputValue: string): boolean {
	if (inputValue.length === 0) return false;
	const regex = /[a-zA-Z0-9]/;
	if (!regex.test(inputValue)) return false;
	return true;
}
