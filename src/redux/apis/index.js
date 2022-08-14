export const baseUrl = 'https://api.coingecko.com/api/v3';

export const fetchData = async (url, options) => {
	try {
		const response = await fetch(url, options);

		if (response.ok) {
			const data = await response.json();
			return data;
		}
		throw response;
	} catch (err) {
		if (err.message === 'Timeout' || err.message === 'Failed to fetch' || err.message === 'Network error') {
			throw err.message;
		}
		const error = await err.text();
		throw error;
	}
};
