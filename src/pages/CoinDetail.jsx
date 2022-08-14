import React, { useState, useEffect, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Typography, Button, ButtonGroup, Container } from '@mui/material';

import { fetchCoinById, fetchCoinHistory } from '../redux/slices/coinsSlice';

import { Loading, CoinLineChart } from '../components';

import { ArrowDropUp } from '@mui/icons-material';

import { DARK_GRAY } from '../styles/colors';
import { timestampToCustomisedDatetime, timestampToDatetime } from '../utils/dateCoverter';
import { currencyConverter } from '../utils/currencyConverter';
import { styled } from '@mui/material/styles';
import { getAppBackgroundColor } from '../styles/colors';

const CoinDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { selectedCoin, selectedCoinLoading, selectedCoinHistory, selectedCoinError } = useSelector(
		state => state.coins,
	);
	const { selectedCurrency, selectedTheme } = useSelector(state => state.settings);
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

	// evaluate if the selected coin is found otherwise redirect to error page
	useEffect(() => {
		if (!selectedCoinError) return;

		navigate('/404');
	}, [selectedCoinError, navigate]);

	useEffect(() => {
		if (!id) return;
		dispatch(fetchCoinById({ id, currency: selectedCurrency }));
	}, [id, selectedCurrency, dispatch]);

	useEffect(() => {
		if (!id) return;
		dispatch(fetchCoinHistory({ id, currency: selectedCurrency, days: selectedDays }));
	}, [id, selectedDays, selectedCurrency, dispatch]);

	// sanitize 3rd party html data
	const sanitizedData = () => {
		return { __html: DOMPurify.sanitize(selectedCoin?.description) || '' };
	};

	return (
		<Container
			maxWidth="xl"
			sx={{
				backgroundColor: getAppBackgroundColor(selectedTheme),
			}}
		>
			<CoinDetailsBox>
				<CoinInfoBox>
					{selectedCoinLoading ? (
						<Loading height="calc(100vh - 70px)" width="100%" />
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
									color="text.primary"
								>
									{selectedCoin?.name}
								</Typography>

								<Typography variant="h5" mr="10px" color="text.primary">
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
										<Typography variant="subtitle1">
											Rank #{selectedCoin.market_cap_rank}
										</Typography>
									</Paper>
								)}
							</Box>

							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									flexWrap: 'wrap',
								}}
								mb="20px"
							>
								<Typography variant="h3" mr="20px" color="text.primary">
									{currencyConverter(selectedCurrency)}
									{selectedCoin?.current_price}
								</Typography>

								{selectedCoin?.price_change_percentage_24h_in_currency === 'N/A' ? (
									<Typography variant="h4" mr="20px" color="text.primary">
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
								<Typography variant="h6" color="text.primary">
									<div dangerouslySetInnerHTML={sanitizedData()} />
								</Typography>
							</Box>
						</Box>
					)}
				</CoinInfoBox>

				<CoinLineChartBox>
					{selectedCoinLoading ? (
						<Loading height={'calc(100vh - 70px)'} width="100%" />
					) : (
						processedHistoricalData.length > 0 &&
						processedHistoricalData[0].price !== 0.0 && (
							<>
								<CoinLineChart data={processedHistoricalData} currency={selectedCurrency} />
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}
									mt="20px"
								>
									<ConstumButtonGroup variant="outlined" aria-label="outlined button group">
										<Button
											onClick={() => setSelectedDays(1)}
											variant={selectedDays === 1 ? 'contained' : 'outlined'}
											disableElevation
										>
											24h
										</Button>
										<Button
											onClick={() => setSelectedDays(7)}
											variant={selectedDays === 7 ? 'contained' : 'outlined'}
											disableElevation
										>
											7d
										</Button>
										<Button
											onClick={() => setSelectedDays(30)}
											variant={selectedDays === 30 ? 'contained' : 'outlined'}
											disableElevation
										>
											30d
										</Button>
									</ConstumButtonGroup>
								</Box>
							</>
						)
					)}
				</CoinLineChartBox>
			</CoinDetailsBox>
		</Container>
	);
};

export default CoinDetail;

const CoinDetailsBox = styled(Box)(({ theme }) => ({
	minHeight: 'calc(100vh - 70px)',
	width: '100%',
	display: 'flex',
	alignItems: 'stretch',
	paddingTop: '90px',
	[theme.breakpoints.down('lg')]: {
		flexDirection: 'column',
	},
	[theme.breakpoints.up('lg')]: {
		flexDirection: 'row',
	},
}));

const CoinInfoBox = styled(Box)(({ theme }) => ({
	flex: 1,
	padding: '20px',
	[theme.breakpoints.down('sm')]: {
		img: {
			height: '80px',
			width: '80px',
		},
	},
	[theme.breakpoints.down('md')]: {
		img: {
			height: '100px',
			width: '100px',
		},
	},
	[theme.breakpoints.down('lg')]: {
		margin: '20px 0',
		borderRight: 'none',
	},
	[theme.breakpoints.up('lg')]: {
		margin: '20px',
		borderRight: `1px solid ${DARK_GRAY}`,
	},
}));

const CoinLineChartBox = styled(Box)(({ theme }) => ({
	flex: 2,
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',

	[theme.breakpoints.down('lg')]: {
		padding: '40px 20px',
	},
	[theme.breakpoints.up('lg')]: {
		padding: '40px',
	},
}));

const ConstumButtonGroup = styled(ButtonGroup)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		button: {
			padding: '4px 8px',
			fontSize: '12px',
		},
	},
	[theme.breakpoints.up('sm')]: {},
}));
