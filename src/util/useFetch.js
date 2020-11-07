const generateUrl = (baseUrl, date) => {
	return baseUrl + date;
};

const useFetch = async (baseUrl, options) => {
	if (options.method === "get") {
		let url = generateUrl(baseUrl, options.currentDate);
		let response;
		let json = {};
		try {
			response = await fetch(url);
			json.serverStatus = response.status;
		} catch {
			response = null;
			json.serverStatus = 504;
		}
		let data;
		try {
			data = await response.json();
		} catch {
			data = [];
		}
		json = { ...json, data };
		return json;
	}
};

export default useFetch;
