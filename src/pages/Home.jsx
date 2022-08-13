import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCoins, fetchCoinsLength } from '../redux/slices/coinsSlice';

import { Box, Button, Container } from '@mui/material';

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
	const { coins, allCoinsLength, coinsLoading, allCoinsLengthLoading } = useSelector(state => state.coins);
	const { selectedCurrency } = useSelector(state => state.settings);

	// const [coinsCategory, setCoinsCategory] = useState("");
	// const [coinsOrder, setCoinsOrder] = useState("market_cap_desc"); // valid values: market_cap_desc, gecko_desc, gecko_asc, market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc
	const [coinsCurrentPage, setCoinsCurrentPage] = useState(-1); // prevent initial dispatch of fetchCoins to avoid async fetching error

	useEffect(() => {
		dispatch(fetchCoinsLength());
	}, [dispatch]);

	useEffect(() => {
		setCoinsCurrentPage(parseInt(query.get('page') || 1));
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

	const handleOnPaginationChange = (event, value) => {
		navigate(`?page=${value}`);
	};

	return (
		// evaluate loading first and then length of data
		<Container maxWidth="xl">
			<Box>
				{allCoinsLengthLoading || coinsLoading ? (
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
							<CoinTable />
						</Box>

						<Box pb="20px">
							<BasicPagination
								count={Math.ceil(allCoinsLength / coinsPerPage)}
								handleOnChange={handleOnPaginationChange}
								currentPage={coinsCurrentPage}
							/>
						</Box>
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
