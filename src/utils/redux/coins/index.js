export const processCoinsData = coins => {
	const processedData = coins.map(coin => {
		const {
			id,
			name,
			image,
			symbol,
			market_cap_rank,
			current_price,
			price_change_percentage_1h_in_currency,
			price_change_percentage_24h_in_currency,
			price_change_percentage_7d_in_currency,
			total_volume,
			market_cap,
			// fully_diluted_valuation,
		} = coin;
		return {
			id: id,
			name: name || '',
			image: image || '',
			symbol: symbol || '',
			market_cap_rank: market_cap_rank || '',
			current_price: current_price || '0.00',
			price_change_percentage_1h_in_currency: price_change_percentage_1h_in_currency || 'N/A',
			price_change_percentage_24h_in_currency: price_change_percentage_24h_in_currency || 'N/A',
			price_change_percentage_7d_in_currency: price_change_percentage_7d_in_currency || 'N/A',
			total_volume: total_volume || 'N/A',
			market_cap: market_cap || 'N/A',
			// fully_diluted_valuation: fully_diluted_valuation || "N/A",
		};
	});
	return processedData;
};

export const processCoinData = (coin, currencyType) => {
	const { id, name, image, symbol, market_cap_rank, market_data, description } = coin;

	const { current_price, market_cap_change_percentage_24h_in_currency } = market_data;

	return {
		id,
		name: name || '',
		image: image?.large || '',
		symbol: symbol.toUpperCase() || '',
		description: description.en.split('. ')[0] ? description.en.split('. ')[0] + '.' : '',
		market_cap_rank: market_cap_rank || 'N/A',
		current_price: current_price?.[currencyType] || 0,
		price_change_percentage_24h_in_currency: market_cap_change_percentage_24h_in_currency?.[currencyType] || 'N/A',
	};
};

export const processHistoricalData = data => {
	const { prices } = data;
	const processedData =
		prices &&
		prices.map(priceData => {
			return {
				date: priceData[0],
				price: priceData[1].toFixed(4),
			};
		});

	return processedData;
};

export const processSearchCoinsData = coins => {
	const processedData = coins.map(coin => coin.id);
	return processedData;
};
