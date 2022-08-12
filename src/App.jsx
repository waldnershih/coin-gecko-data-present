import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home, PageNotFound, Coins, CoinDetail } from "./pages";
import { Header, Footer, ScrollToTop } from "./components";
import { Box } from "@mui/material";

const App = () => {
	return (
		<Box>
			<ScrollToTop>
				<Header />
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/coins" exact element={<Coins />} />
					<Route path="/coins/:id" element={<CoinDetail />} />
					<Route path="/404" exact element={<PageNotFound />} />
					<Route path="*" exact element={<Navigate to="/404" />} />
				</Routes>
				<Footer />
			</ScrollToTop>
		</Box>
	);
};

export default App;
