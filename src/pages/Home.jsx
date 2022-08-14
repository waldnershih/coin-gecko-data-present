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
} from '@mui/material';

import { Search as SearchIcon } from '@mui/icons-material';

import { BasicPagination, CoinTable, DataNotFound, Loading } from '../components';
import useQuery from '../hooks/useQuery';

// Define the default sorting rules for the table.
const coinsPerPage = 50;
const coinsOrder = 'market_cap_desc';
const coinsCategory = '';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let query = useQuery();
	const { coins, searchCoinIds, allCoinsLength, coinsLoading, allCoinsLengthLoading, searchCoinIdsLoading } =
		useSelector(state => state.coins);
	const { selectedCurrency } = useSelector(state => state.settings);

	// const [coinsCategory, setCoinsCategory] = useState("");
	// const [coinsOrder, setCoinsOrder] = useState("market_cap_desc"); // valid values: market_cap_desc, gecko_desc, gecko_asc, market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc
	const [coinsCurrentPage, setCoinsCurrentPage] = useState(-1); // prevent initial dispatch of fetchCoins to avoid async fetching error
	const [searchValue, setSearchValue] = useState('');
	const [searchTermAndPage, setSearchTermAndPage] = useState(''); // search term => for fetchCoinIds and page number => for currentPage

	useEffect(() => {
		dispatch(fetchCoinsLength());
	}, [dispatch]);

	useEffect(() => {
		const page = query.get('page');
		const searchTerm = query.get('search');
		if (page && searchTerm) {
			// search and page query params both exist
			dispatch(fetchSearchCoinIds(searchTerm));
			setSearchTermAndPage(searchTerm + ',' + page);
			setCoinsCurrentPage(-1);
		} else if (page) {
			// only page query param exists
			setCoinsCurrentPage(parseInt(page));
			setSearchTermAndPage('');
		} else if (searchTerm) {
			// only search query param exists
			dispatch(fetchSearchCoinIds(searchTerm));
			setSearchTermAndPage(searchTerm + ',1');
			setCoinsCurrentPage(-1);
		} else {
			// no query params exist
			setCoinsCurrentPage(1);
			setSearchTermAndPage('');
		}
	}, [query, dispatch]);

	useEffect(() => {
		if (coinsCurrentPage === -1) return;
		dispatch(
			fetchCoins({
				coinsVsCurrency: selectedCurrency,
				coinsPerPage,
				coinsCategory,
				coinsOrder,
				coinsCurrentPage,
			}),
		);
	}, [selectedCurrency, coinsCurrentPage, dispatch]);

	useEffect(() => {
		if (!searchTermAndPage) return;
		if (searchCoinIds.length === 0) return;
		console.log('coinsCurrentPage2.........');
		dispatch(
			fetchCoins({
				coinsVsCurrency: selectedCurrency,
				coinsPerPage,
				coinsCategory,
				coinsOrder,
				coinsCurrentPage: searchTermAndPage.split(',')[1],
				searchCoinIds,
			}),
		);
	}, [searchCoinIds, selectedCurrency, searchTermAndPage, dispatch]);

	const handleOnPaginationChange = (event, value) => {
		navigate(`?page=${value}`);
	};

	const handleOnPaginationChangeWithSearch = (event, value) => {
		const searchTerm = searchTermAndPage?.split(',')[0];
		navigate(`?search=${searchTerm}&page=${value}`);
	};

	const handleOnSearchClick = () => {
		navigate(`?search=${searchValue}&page=1`);
		setSearchValue('');
	};

	const handleOnAllCategoryClick = () => {
		navigate(`?page=1`);
	};

	return (
		// evaluate loading first and then length of data
		<Container maxWidth="xl">
			<Box>
				{allCoinsLengthLoading || searchCoinIdsLoading || coinsLoading ? (
					<Loading height={'90vh'} width={'100%'} pt="7vh" />
				) : coins.length > 0 ? (
					<Box
						sx={{
							minHeight: '90vh',
							width: '100%',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
						pt="10vh"
					>
						<Box
							p="20px"
							sx={{
								width: '100%',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<Button variant="outlined" onClick={handleOnAllCategoryClick}>
									All Category
								</Button>
								<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size="small">
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
								</FormControl>
							</Box>

							<CoinTable />
						</Box>

						{coinsCurrentPage !== -1 ? (
							<Box pb="20px">
								<BasicPagination
									count={Math.ceil(allCoinsLength / coinsPerPage)}
									handleOnChange={handleOnPaginationChange}
									currentPage={coinsCurrentPage}
								/>
							</Box>
						) : (
							<Box pb="20px">
								<BasicPagination
									count={Math.ceil(searchCoinIds?.length / coinsPerPage)}
									handleOnChange={handleOnPaginationChangeWithSearch}
									currentPage={parseInt(searchTermAndPage?.split(',')[1] || coinsCurrentPage)}
								/>
							</Box>
						)}
					</Box>
				) : (
					<Box
						sx={{
							minHeight: '90vh',
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column',
						}}
						pt="7vh"
					>
						<DataNotFound />

						<Button onClick={() => navigate(-1)}>Go Back</Button>
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default Home;
