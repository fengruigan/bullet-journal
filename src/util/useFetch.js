import { useState } from "react";

const generateUrl = (baseUrl, options) => {
	return baseUrl + options;
};

export const useFetch = async (baseUrl, options) => {
	let [value, setValue] = useState({});
	let url = generateUrl(baseUrl, options);
	fetch(url)
		.then((response) => {
			response.json();
		})
		.then((json) => setValue(json));
	return value;
};
