export const login = async (apiUrl, username) => {
	// fetch from db
	let signedInUser;
	try {
		let response = await fetch(apiUrl + username);
		signedInUser = await response.json();
	} catch {
		signedInUser = null;
	}
	return signedInUser;
};
