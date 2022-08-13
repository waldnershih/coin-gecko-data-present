import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home, PageNotFound, Coins, CoinDetail } from "./pages";
import {
	Header,
	// Footer,
	ScrollToTop,
} from "./components";
import { Box, Divider } from "@mui/material";
import { LIGHT_BLACK } from "./styles/colors";

const App = () => {
	return (
		<Box>
			<ScrollToTop>
				<Header />
				<Divider sx={{ LIGHT_BLACK }} />
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/coins" exact element={<Coins />} />
					<Route path="/coins/:id" element={<CoinDetail />} />
					<Route path="/404" exact element={<PageNotFound />} />
					<Route path="*" exact element={<Navigate to="/404" />} />
				</Routes>
				{/* <Footer /> */}
			</ScrollToTop>
		</Box>
	);
};

export default App;
