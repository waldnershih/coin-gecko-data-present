import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchData, baseUrl } from "../apis";

const coinsBaseUrl = `${baseUrl}/coins`;

const coinsOption = { method: "GET" };

const initialCoinsState = {
	allCoinsLength: 0,
	allCoinsLengthLoading: false,
	allCoinsLengthError: "",
	allCoinsLengthSuccess: false,
	allCoins: [],
	coins: [],
	coinsLoading: false,
	coinsError: "",
	coinsSuccess: false,
	selectedCoinId: "",
};

// actions
export const fetchCoins = createAsyncThunk(
	"coins/fetchCoins",
	async (searchParams) => {
		const {
			coinsVsCurrency = "usd",
			coinsOrder = "market_cap_desc",
			coinsPerPage = 50,
			coinsCurrentPage,
			coinsSparkline = false,
			coinsPriceChangePercentage = "1h,24h,7d",
		} = searchParams;

		const coinsUrl = new URL(`${coinsBaseUrl}/markets`);
		coinsUrl.search = new URLSearchParams({
			vs_currency: coinsVsCurrency,
			order: coinsOrder,
			per_page: coinsPerPage,
			page: coinsCurrentPage,
			sparkline: coinsSparkline,
			price_change_percentage: coinsPriceChangePercentage,
		}).toString();

		try {
			const response = await fetchData(coinsUrl, coinsOption);
			return response;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

export const fetchCoinsLength = createAsyncThunk(
	"coins/fetchCoinsLength",
	async () => {
		const coinsLengthUrl = `${coinsBaseUrl}/list`;
		try {
			const response = await fetchData(coinsLengthUrl, coinsOption);
			return response.length;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

export const coinsSlice = createSlice({
	name: "coins",
	initialState: initialCoinsState,
	reducers: {
		setSelectedCoinId: (state, action) => {
			state.selectedCoinId = action.payload;
		},
		setInitialCoinsState: (state) => {
			state.allCoinsLength = 0;
			state.allCoinsLengthLoading = false;
			state.allCoinsLengthError = "";
			state.allCoinsLengthSuccess = false;
			state.coins = [];
			state.selectedCoinId = "";
			state.coinsLoading = false;
			state.coinsError = "";
			state.coinsSuccess = false;
		},
	},
	extraReducers: {
		// fetch coins
		[fetchCoins.pending]: (state, _) => {
			state.coinsLoading = true;
			state.coinsError = "";
			state.coinsSuccess = false;
		},
		[fetchCoins.fulfilled]: (state, action) => {
			state.coinsLoading = false;
			state.coins = action.payload;
			state.coinsError = "";
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
			state.allCoinsLengthError = "";
			state.allCoinsLengthSuccess = false;
		},
		[fetchCoinsLength.fulfilled]: (state, action) => {
			state.allCoinsLengthLoading = false;
			state.allCoinsLength = action.payload;
			state.allCoinsLengthError = "";
			state.allCoinsLengthSuccess = true;
		},
		[fetchCoinsLength.rejected]: (state, action) => {
			state.allCoinsLengthLoading = false;
			state.allCoinsLengthError = action.error.message;
			state.allCoinsLengthSuccess = false;
		},
	},
});

export const {
	setSelectedCoinId,
	setCoinsCategory,
	// setCoinsVsCurrency,
	setCoinsOrder,
	// setCoinsPerPage,
	setCoinsCurrentPage,
	// setCoinsSparkline,
	// setCoinsPriceChangePercentage,
	setInitialCoinsState,
} = coinsSlice.actions;

export const coinsReducer = coinsSlice.reducer;
