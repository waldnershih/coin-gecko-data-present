export const currencyConverter = currency => {
	switch (currency) {
		case 'usd':
			return '$';
		case 'aud':
			return 'A$';
		case 'eur':
			return '€';
		default:
			return '$';
	}
};
