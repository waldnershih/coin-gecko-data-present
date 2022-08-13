import React, { isValidElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Typography,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { DARK_GRAY } from '../styles/colors';
import { currencyConverter } from '../utils/currencyConverter';

// Define the columns with specific rules for the table.
const columns = [
	{ id: 'market_cap_rank', label: 'Rank', minWidth: 100, align: 'center' },
	{ id: 'name', label: 'Coin', minWidth: 170, align: 'left' },
	{
		id: 'current_price',
		label: 'Price',
		minWidth: 170,
		align: 'right',
		format: value =>
			value > 0.000001
				? `${currencyConverter(window.localStorage.getItem('selectedCurrency') || 'usd')}${value}`
				: `${value.toFixed(12)}`, // Formatting if value is number.
	},
	{
		id: 'price_change_percentage_1h_in_currency',
		label: '1h',
		minWidth: 100,
		align: 'right',
		getColor: value => (value === 'N/A' ? '' : value >= 0 ? 'success.light' : 'error.light'),
		format: value => `${value.toFixed(1)}%`,
	},
	{
		id: 'price_change_percentage_24h_in_currency',
		label: '24h',
		minWidth: 100,
		align: 'right',
		getColor: value => (value === 'N/A' ? '' : value >= 0 ? 'success.light' : 'error.light'),
		format: value => `${value.toFixed(1)}%`,
	},
	{
		id: 'price_change_percentage_7d_in_currency',
		label: '7d',
		minWidth: 100,
		align: 'right',
		getColor: value => (value === 'N/A' ? '' : value >= 0 ? 'success.light' : 'error.light'),
		format: value => `${value.toFixed(1)}%`,
	},

	{
		id: 'total_volume',
		label: '24h Volume',
		minWidth: 170,
		align: 'right',
		format: value =>
			`${currencyConverter(window.localStorage.getItem('selectedCurrency') || 'usd')}${value.toLocaleString(
				'en-US',
			)}`,
	},
	{
		id: 'market_cap',
		label: 'Mkt Cap',
		minWidth: 170,
		align: 'right',
		format: value =>
			`${currencyConverter(window.localStorage.getItem('selectedCurrency') || 'usd')}${value.toLocaleString(
				'en-US',
			)}`,
	},
];

// Customise the Table component based on the Material UI Table component.
// rows: [{id: {value, handleOnCellClick || null}, cellName: {value, handleOnCellClick || null}}]
const BasicTable = () => {
	const { coins } = useSelector(state => state.coins);
	const navigate = useNavigate();

	// Prevent keep rerender
	const handleOnCellClick = useMemo(
		() => rowId => {
			navigate(`/coins/${rowId}`);
		},
		[navigate],
	);

	// Process data to display in table, trigger only when handleOnCellClick is called and coins is updated.
	const createData = useMemo(
		() => coin => {
			const {
				id,
				name,
				image,
				symbol,
				market_cap_rank,
				current_price,
				price_change_percentage_1h_in_currency,
				price_change_percentage_24h_in_currency,
				price_change_percentage_7d_in_currency,
				total_volume,
				market_cap,
			} = coin;

			// Combine image, name, symbol to name react-node

			const nameNode = (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						img: {
							width: '32px',
							height: '32x',
							marginRight: '10px',
						},
					}}
					onClick={handleOnCellClick ? () => handleOnCellClick(id) : null}
				>
					<img src={image} alt={name} loading="lazy" />
					<Typography
						variant="body1"
						ml={2}
						sx={{
							fontWeight: 'bold',
						}}
					>
						{name}
					</Typography>
					<Typography
						variant="caption"
						ml={2}
						sx={{
							color: DARK_GRAY,
						}}
					>
						{symbol.toUpperCase()}
					</Typography>
				</Box>
			);

			// Handle cell onClick event
			return {
				id,
				name: nameNode,
				market_cap_rank,
				current_price,
				price_change_percentage_1h_in_currency,
				price_change_percentage_24h_in_currency,
				price_change_percentage_7d_in_currency,
				total_volume,
				market_cap,
			};
		},
		[handleOnCellClick],
	);

	// Process data to display in table, trigger only when createData is called and coins is updated.
	let rows = useMemo(() => {
		return coins.map(coin => createData(coin));
	}, [coins, createData]);

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 0 }}>
			<TableContainer>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
									onClick={column.handleOnClick}
								>
									<Typography
										variant="subtitle1"
										sx={{
											fontWeight: 'bold',
										}}
									>
										{column.label}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
									{columns.map(column => {
										const value = row[column.id];
										return (
											<TableCell
												key={column.id}
												align={column.align}
												sx={[
													handleOnCellClick && {
														'&:hover': {
															cursor: 'pointer',
														},
													},
												]}
											>
												{isValidElement(value) ? (
													value
												) : (
													<Typography
														variant="body1"
														sx={{
															color: column.getColor && column.getColor(value),
														}}
													>
														{column.format && typeof value === 'number'
															? column.format(value)
															: value}
													</Typography>
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default BasicTable;
