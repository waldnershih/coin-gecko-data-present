import React, { useState, useEffect, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Typography, Button, ButtonGroup } from '@mui/material';

import { fetchCoinById, fetchCoinHistory } from '../redux/slices/coinsSlice';

import { PageWrapper } from '../wrapper';

import { Loading, CoinLineChart } from '../components';

import { ArrowDropUp } from '@mui/icons-material';

import { timestampToCustomisedDatetime, timestampToDatetime } from '../utils/dateCoverter';

const CoinDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { selectedCoin, selectedCoinLoading, selectedCoinHistory } = useSelector(state => state.coins);
	const [selectedDays, setSelectedDays] = useState(1);

	// convert selectedCoinHistory data to chart format data with memoization
	let processedHistoricalData = useMemo(() => {
		if (!selectedCoinHistory) return [];

		return selectedCoinHistory.map(data => {
			return {
				date: timestampToCustomisedDatetime(data.date, selectedDays),
				price: data.price,
				label: timestampToDatetime(data.date),
			};
		});
	}, [selectedCoinHistory, selectedDays]);

	useEffect(() => {
		if (!id) return;
		dispatch(fetchCoinById(id));
	}, [id, dispatch]);

	useEffect(() => {
		if (!id) return;
		dispatch(fetchCoinHistory({ id, currency: 'usd', days: selectedDays }));
	}, [id, selectedDays, dispatch]);

	// sanitize 3rd party html data
	const sanitizedData = () => {
		return { __html: DOMPurify.sanitize(selectedCoin?.description) || '' };
	};

	return (
		<Box
			sx={{
				minHeight: '70vh',
				width: '100%',
				display: 'flex',
				alignItems: 'stretch',
			}}
		>
			<Box sx={{ flex: 1, borderRight: '1px solid black' }} m="20px" p="20px">
				{selectedCoinLoading ? (
					<Loading height="70vh" width="100%" />
				) : (
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box mb="20px">
							<img
								src={selectedCoin?.image}
								alt={selectedCoin?.name}
								loading="lazy"
								height={120}
								width={120}
							/>
						</Box>

						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								flexWrap: 'wrap',
							}}
							mb="10px"
						>
							<Typography
								variant="h4"
								mr="5px"
								sx={{
									whiteSpace: 'nowrap',
								}}
							>
								{selectedCoin?.name}
							</Typography>

							<Typography variant="h5" mr="10px">
								({selectedCoin?.symbol})
							</Typography>

							{selectedCoin && selectedCoin?.market_cap_rank !== 'N/A' && (
								<Paper
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										whiteSpace: 'nowrap',
										backgroundColor: 'primary.main',
										color: 'primary.contrastText',
										padding: '10px',
										height: 30,
									}}
								>
									<Typography variant="subtitle1">Rank #{selectedCoin.market_cap_rank}</Typography>
								</Paper>
							)}
						</Box>

						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
							mb="20px"
						>
							<Typography variant="h3" mr="20px">
								${selectedCoin?.current_price}
							</Typography>

							{selectedCoin?.price_change_percentage_24h_in_currency === 'N/A' ? (
								<Typography variant="h4" mr="20px">
									{selectedCoin?.price_change_percentage_24h_in_currency}
								</Typography>
							) : (
								<Typography
									variant="h4"
									sx={{
										color:
											selectedCoin?.price_change_percentage_24h_in_currency > 0
												? 'success.light'
												: 'error.light',
									}}
								>
									<ArrowDropUp color="success.light" fontSize="24px" />
									{selectedCoin?.price_change_percentage_24h_in_currency.toFixed(1)}%
								</Typography>
							)}
						</Box>

						<Box>
							<Typography variant="h6">
								<div dangerouslySetInnerHTML={sanitizedData()} />
							</Typography>
						</Box>
					</Box>
				)}
			</Box>

			<Box
				sx={{
					flex: 2,
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
				m="20px"
				p="20px"
			>
				{selectedCoinLoading ? (
					<Loading height="70vh" width="100%" />
				) : (
					processedHistoricalData.length > 0 &&
					processedHistoricalData[0].price !== 0.0 && (
						<>
							<CoinLineChart data={processedHistoricalData} />
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
								mt="20px"
							>
								<ButtonGroup variant="outlined" aria-label="outlined button group">
									<Button
										onClick={() => setSelectedDays(1)}
										variant={selectedDays === 1 ? 'contained' : 'outlined'}
									>
										24h
									</Button>
									<Button
										onClick={() => setSelectedDays(7)}
										variant={selectedDays === 7 ? 'contained' : 'outlined'}
									>
										7d
									</Button>
									<Button
										onClick={() => setSelectedDays(30)}
										variant={selectedDays === 30 ? 'contained' : 'outlined'}
									>
										30d
									</Button>
								</ButtonGroup>
							</Box>
						</>
					)
				)}
			</Box>
		</Box>
	);
};

export default PageWrapper(CoinDetail);
