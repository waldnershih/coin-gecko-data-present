import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCoins, fetchCoinsLength, fetchSearchCoinIds } from '../redux/slices/coinsSlice';

import {
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Typography,
} from '@mui/material';

import { Search as SearchIcon } from '@mui/icons-material';

import { CoinTable, DataNotFound, Loading } from '../components';
import { styled } from '@mui/material/styles';
import { ThemeProvider, responsiveFontSizesTheme } from '../styles/themes';

// Define the default sorting rules for the table.
const coinsPerPage = 50;
const coinsOrder = 'market_cap_desc';
const coinsCategory = '';

const initialCoinsParamsState = {
	coinsCurrentPage: 1,
	coinIds: ['all'],
};

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// let query = useQuery();
	const { coins, searchCoinIds, allCoinsLength, coinsLoading, allCoinsLengthLoading, searchCoinIdsSuccess } =
		useSelector(state => state.coins);
	const { selectedCurrency } = useSelector(state => state.settings);

	// const [coinsCategory, setCoinsCategory] = useState("");
	const [coinsParams, setCoinsParams] = useState(initialCoinsParamsState);
	const [searchValue, setSearchValue] = useState('');
	const [isSearching, setIsSearching] = useState(false);

	// get all coins length for pagination for all categories
	useEffect(() => {
		dispatch(fetchCoinsLength());
	}, [dispatch]);

	useEffect(() => {
		if (!searchCoinIdsSuccess) return;

		// always search from the first page
		setCoinsParams({ coinIds: searchCoinIds, coinsCurrentPage: 1 });
	}, [searchCoinIds, searchCoinIdsSuccess]);

	// since getting coins has two steps, we need to wait for the both steps to finish and then display the table
	useEffect(() => {
		if (coinsLoading) return;
		setIsSearching(false);
	}, [coinsLoading]);

	useEffect(() => {
		const { coinsCurrentPage, coinIds } = coinsParams;

		dispatch(
			fetchCoins({
				coinsVsCurrency: selectedCurrency,
				coinsCurrentPage,
				coinsPerPage,
				coinsOrder,
				coinsCategory,
				searchCoinIds: coinIds,
			}),
		);
	}, [coinsParams, selectedCurrency, dispatch]);

	const handleOnPaginationChange = (event, value) => {
		setCoinsParams(perState => ({ ...perState, coinsCurrentPage: value }));
	};

	const handleOnSearchClick = () => {
		dispatch(fetchSearchCoinIds(searchValue));
		setIsSearching(true);
	};

	const handleOnAllCategoryClick = () => {
		navigate(`/`);
		dispatch(fetchCoinsLength());
		//  initialize the state of home page
		setCoinsParams(initialCoinsParamsState);
		setSearchValue('');
	};

	return (
		// evaluate loading first and then length of data
		<ThemeProvider theme={responsiveFontSizesTheme}>
			<Container maxWidth="xl">
				<Box>
					{allCoinsLengthLoading || isSearching || coinsLoading ? (
						<Loading height={'90vh'} width={'100%'} pt="7vh" />
					) : (
						<Box
							sx={{
								minHeight: '90vh',
								width: '100%',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
							pt="90px"
						>
							<TableBox>
								<FilterBar>
									<Button variant="outlined" onClick={handleOnAllCategoryClick} m="10px 0">
										<Typography
											sx={{
												whiteSpace: 'nowrap',
											}}
										>
											All Category
										</Typography>
									</Button>
									<SearchBar variant="outlined" size="small">
										<InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
										<OutlinedInput
											id="outlined-adornment-search"
											type="text"
											value={searchValue}
											onChange={e => setSearchValue(e.target.value)}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle search"
														edge="end"
														onClick={handleOnSearchClick}
													>
														<SearchIcon />
													</IconButton>
												</InputAdornment>
											}
											label="Password"
										/>
									</SearchBar>
								</FilterBar>
								{coins.length > 0 ? (
									<Box mt="20px" mb="20px">
										<CoinTable
											pagination={{
												count: Math.ceil(allCoinsLength / coinsPerPage),
												currentPage: coinsParams.coinsCurrentPage,
												handleOnPaginationChange,
											}}
										/>
									</Box>
								) : (
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'stretch',
										}}
										mt="7vh"
									>
										<DataNotFound />
									</Box>
								)}
							</TableBox>
						</Box>
					)}
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default Home;

const TableBox = styled(Box)(({ theme }) => ({
	width: '100%',
	[theme.breakpoints.down('sm')]: {
		padding: '0px',
	},
	[theme.breakpoints.up('sm')]: {
		padding: '20px',
	},
}));

const FilterBar = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	[theme.breakpoints.down('md')]: {
		flexDirection: 'column-reverse',
		alignItems: 'flex-start',
	},
	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
		alignItems: 'center',
	},
}));

const SearchBar = styled(FormControl)(({ theme }) => ({
	margin: '10px 0',
	[theme.breakpoints.down('md')]: {
		width: '100%',
	},
	[theme.breakpoints.up('md')]: {
		width: '40%',
	},
}));
