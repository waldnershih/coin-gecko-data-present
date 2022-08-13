import { createSlice } from '@reduxjs/toolkit';

const initialSettingsState = {
	selectedCurrency: window.localStorage.getItem('selectedCurrency') || 'usd',
	selectedTheme: window.localStorage.getItem('selectedTheme') || 'light',
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState: initialSettingsState,
	reducers: {
		setSelectedCurrency: (state, action) => {
			window.localStorage.setItem('selectedCurrency', action.payload);
			state.selectedCurrency = action.payload;
		},
		setSelectedTheme: (state, action) => {
			window.localStorage.setItem('selectedTheme', action.payload);
			state.selectedTheme = action.payload;
		},
	},
	extraReducers: {},
});

export const { setSelectedCurrency, setSelectedTheme } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
