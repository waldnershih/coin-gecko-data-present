import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
	processCoinsData,
	processCoinData,
	processHistoricalData,
	processSearchCoinsData,
} from '../../utils/redux/coins';
import { fetchData, baseUrl } from '../apis';

const coinsBaseUrl = `${baseUrl}/coins`;
const coinsOption = { method: 'GET' };

const initialCoinsState = {
	// get allCoinsLength from api
	allCoinsLength: 0,
	allCoinsLengthLoading: false,
	allCoinsLengthError: '',
	allCoinsLengthSuccess: false,
	// get allCoins
	coins: [],
	coinsLoading: false,
	coinsError: '',
	coinsSuccess: false,
	// get selectedCoin
	selectedCoin: null,
	selectedCoinLoading: false,
	selectedCoinError: '',
	selectedCoinSuccess: false,
	// get selectedCoinHistory
	selectedCoinHistory: [],
	selectedCoinHistoryLoading: false,
	selectedCoinHistoryError: '',
	selectedCoinHistorySuccess: false,
	// get searchCoinIds
	searchCoinIds: [],
	searchCoinIdsLoading: false,
	searchCoinIdsError: '',
	searchCoinIdsSuccess: false,
};

// actions
export const fetchCoins = createAsyncThunk('coins/fetchCoins', async searchParams => {
	const {
		coinsVsCurrency,
		coinsOrder = 'market_cap_desc',
		coinsPerPage = 50,
		coinsCurrentPage,
		coinsSparkline = false,
		coinsPriceChangePercentage = '1h,24h,7d',
		searchCoinIds,
	} = searchParams;

	// processed searchCoinIds params format
	let newSearchCoinIds = searchCoinIds;
	if (searchCoinIds.length <= 0) {
		newSearchCoinIds = '[]';
	} else if (searchCoinIds[0] === 'all') {
		newSearchCoinIds = '';
	}

	const coinsUrl = new URL(`${coinsBaseUrl}/markets`);
	coinsUrl.search = new URLSearchParams({
		ids: newSearchCoinIds || '',
		vs_currency: coinsVsCurrency,
		order: coinsOrder,
		per_page: coinsPerPage,
		page: coinsCurrentPage,
		sparkline: coinsSparkline,
		price_change_percentage: coinsPriceChangePercentage,
	}).toString();

	try {
		const response = await fetchData(coinsUrl, coinsOption);
		const processedResponse = processCoinsData(response);
		return processedResponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
});

export const fetchCoinsLength = createAsyncThunk('coins/fetchCoinsLength', async () => {
	const coinsLengthUrl = `${coinsBaseUrl}/list`;
	try {
		const response = await fetchData(coinsLengthUrl, coinsOption);
		return response.length;
	} catch (error) {
		console.log(error);
		throw error;
	}
});

export const fetchCoinById = createAsyncThunk('coins/fetchCoinById', async ({ id, currency }) => {
	const selectedCoinUrl = `${coinsBaseUrl}/${id}`;
	try {
		const response = await fetchData(selectedCoinUrl, coinsOption);
		const processResponse = processCoinData(response, currency);
		return processResponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
});

export const fetchCoinHistory = createAsyncThunk('coins/fetchCoinHistory', async ({ id, currency, days }) => {
	const selectedCoinHistoryUrl = `${coinsBaseUrl}/${id}/market_chart?vs_currency=${currency}&days=${days}`;
	try {
		const response = await fetchData(selectedCoinHistoryUrl, coinsOption);
		const processResponse = processHistoricalData(response);

		return processResponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
});

export const fetchSearchCoinIds = createAsyncThunk('coins/fetchSearchCoinIds', async searchTerms => {
	const searchCoinIdsUrl = `${baseUrl}/search?query=${searchTerms}`;

	try {
		const response = await fetchData(searchCoinIdsUrl, coinsOption);
		const processResponse = processSearchCoinsData(response.coins);
		return processResponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
});

export const coinsSlice = createSlice({
	name: 'coins',
	initialState: initialCoinsState,
	reducers: {},
	extraReducers: {
		// fetch coins
		[fetchCoins.pending]: (state, _) => {
			state.coinsLoading = true;
			state.coinsError = '';
			state.coinsSuccess = false;
		},
		[fetchCoins.fulfilled]: (state, action) => {
			state.coinsLoading = false;
			state.coins = action.payload;
			state.coinsError = '';
			state.coinsSuccess = true;
		},
		[fetchCoins.rejected]: (state, action) => {
			state.coinsLoading = false;
			state.coinsError = action.error.message;
			state.coinsSuccess = false;
		},
		// fetch coins length
		[fetchCoinsLength.pending]: (state, _) => {
			state.allCoinsLengthLoading = true;
			state.allCoinsLengthError = '';
			state.allCoinsLengthSuccess = false;
		},
		[fetchCoinsLength.fulfilled]: (state, action) => {
			state.allCoinsLengthLoading = false;
			state.allCoinsLength = action.payload;
			state.allCoinsLengthError = '';
			state.allCoinsLengthSuccess = true;
		},
		[fetchCoinsLength.rejected]: (state, action) => {
			state.allCoinsLengthLoading = false;
			state.allCoinsLengthError = action.error.message;
			state.allCoinsLengthSuccess = false;
		},
		// fetch selected coin
		[fetchCoinById.pending]: (state, _) => {
			state.selectedCoinLoading = true;
			state.selectedCoinError = '';
			state.selectedCoinSuccess = false;
		},
		[fetchCoinById.fulfilled]: (state, action) => {
			state.selectedCoinLoading = false;
			state.selectedCoin = action.payload;
			state.selectedCoinError = '';
			state.selectedCoinSuccess = true;
		},
		[fetchCoinById.rejected]: (state, action) => {
			state.selectedCoinLoading = false;
			state.selectedCoinError = action.error.message;
			state.selectedCoinSuccess = false;
		},
		// fetch selected coin history
		[fetchCoinHistory.pending]: (state, _) => {
			state.selectedCoinHistoryLoading = true;
			state.selectedCoinHistoryError = '';
			state.selectedCoinHistorySuccess = false;
		},
		[fetchCoinHistory.fulfilled]: (state, action) => {
			state.selectedCoinHistoryLoading = false;
			state.selectedCoinHistory = action.payload;
			state.selectedCoinHistoryError = '';
			state.selectedCoinHistorySuccess = true;
		},
		[fetchCoinHistory.rejected]: (state, action) => {
			state.selectedCoinHistoryLoading = false;
			state.selectedCoinHistoryError = action.error.message;
			state.selectedCoinHistorySuccess = false;
		},
		// fetch search coin ids
		[fetchSearchCoinIds.pending]: (state, _) => {
			state.searchCoinIdsLoading = true;
			state.searchCoinIdsError = '';
			state.searchCoinIdsSuccess = false;
		},
		[fetchSearchCoinIds.fulfilled]: (state, action) => {
			state.searchCoinIdsLoading = false;
			state.searchCoinIds = action.payload;
			state.allCoinsLength = action.payload.length; // set all coins length to search results length
			state.searchCoinIdsError = '';
			state.searchCoinIdsSuccess = true;
		},
		[fetchSearchCoinIds.rejected]: (state, action) => {
			state.searchCoinIdsLoading = false;
			state.searchCoinIdsError = action.error.message;
			state.searchCoinIdsSuccess = false;
		},
	},
});

export const coinsReducer = coinsSlice.reducer;
