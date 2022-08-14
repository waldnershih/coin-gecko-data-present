import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home, PageNotFound, CoinDetail } from './pages';
import { Header, Footer, ScrollToTop, BasicDrawer } from './components';
import { Box } from '@mui/material';
import { ThemeProvider, responsiveDarkTheme, responsiveLightTheme } from './styles/themes';
import { useSelector } from 'react-redux';

const App = () => {
	const { selectedTheme } = useSelector(state => state.settings);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<ThemeProvider theme={selectedTheme === 'light' ? responsiveLightTheme : responsiveDarkTheme}>
			<Box>
				<ScrollToTop>
					<Header setIsDrawerOpen={setIsDrawerOpen} />
					<BasicDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
					<Routes>
						<Route path="/" exact element={<Home />} />
						<Route path="/coins/:id" exact element={<CoinDetail />} />
						<Route path="/404" exact element={<PageNotFound />} />
						<Route path="*" exact element={<Navigate to="/404" />} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</Box>
		</ThemeProvider>
	);
};

export default App;
