const PRE_KEY = "quotes_API_";

export function getLocalStorage(key: string) {
	key = PRE_KEY + key;
	return localStorage[key] ? JSON.parse(localStorage[key]!) : null;
}

export function setLocalStorage(key: string, value: any) {
	key = PRE_KEY + key;
	localStorage[key] = JSON.stringify(value);
}

export function removeLocalStorage(key: string) {
	key = PRE_KEY + key;
	localStorage.removeItem(key);
}
