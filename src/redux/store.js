import { configureStore } from "@reduxjs/toolkit";
import { coinsReducer } from "./slices/coinsSlice";
// import { exerciseReducer } from './slices/exerciseSlice';

const store = configureStore({
	reducer: {
		coins: coinsReducer,
	},
});

export default store;
