import React, { isValidElement, useMemo, useState } from 'react';
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
	useMediaQuery,
} from '@mui/material';
import { PURPLE_GRAY, DARK_GRAY, BLUE_GRAY, GRAY } from '../styles/colors';
import { currencyConverter } from '../utils/currencyConverter';
import { ArrowDropUp as ArrowDropUpIcon, ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { BasicPagination } from '../components';
import { styled, useTheme } from '@mui/material/styles';

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
// rows: [{id: {value, handleOnRowCellClick || null}, cellName: {value, handleOnRowCellClick || null}}]
const BasicTable = ({ pagination }) => {
	const { coins } = useSelector(state => state.coins);
	const { selectedTheme } = useSelector(state => state.settings);
	const navigate = useNavigate();
	const [orderBy, setOrderBy] = useState('market_cap');
	const [order, setOrder] = useState('desc');

	// change pagination style based on the window size
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));

	const handleOnHeadCellClick = id => {
		setOrderBy(id);
		setOrder(preState => (preState === 'desc' ? 'asc' : 'desc'));
	};

	// Prevent keep rerender
	const handleOnRowCellClick = useMemo(
		() => rowId => {
			navigate(`/coins/${rowId}`);
		},
		[navigate],
	);

	// Process data to display in table, trigger only when handleOnRowCellClick is called and coins is updated.
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
					onClick={handleOnRowCellClick ? () => handleOnRowCellClick(id) : null}
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
		[handleOnRowCellClick],
	);

	// Sort data by orderBy and order
	let processedRows = useMemo(() => {
		const sortedRows = [...coins];
		// sorting
		sortedRows.sort((a, b) => {
			let aValue = a[orderBy] === 'N/A' || a[orderBy] === '0.00' ? 0 : a[orderBy];
			let bValue = b[orderBy] === 'N/A' || b[orderBy] === '0.00' ? 0 : b[orderBy];

			// console.log(aValue, bValue);

			if (typeof aValue === 'string' && typeof aValue === 'string') {
				aValue = aValue.toLowerCase();
				bValue = bValue.toLowerCase();
			}

			if (order === 'desc') {
				return bValue > aValue ? 1 : -1;
			}
			return aValue > bValue ? 1 : -1;
		});
		// create row data for table by coins
		return sortedRows.map(coin => createData(coin));
	}, [coins, orderBy, order, createData]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 0 }}>
				<TableContainer>
					<Table aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map(column => (
									<StickyTableHead
										key={column.id}
										style={{ minWidth: column.minWidth }}
										positionkey={column.id}
										thememode={selectedTheme}
									>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: column.align === 'right' ? 'flex-end' : 'flex-start',

												'&:hover': {
													cursor: 'pointer',
													div: {
														opacity: 1,
													},
												},
											}}
											onClick={() => handleOnHeadCellClick(column.id)}
										>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													flexDirection: 'column',
													opacity: 0,
												}}
												p="0 5px"
											>
												<ArrowDropUpIcon
													style={{
														color:
															orderBy === column.id && order === 'asc'
																? 'black'
																: PURPLE_GRAY,
														fontSize: '1.3rem',
													}}
												/>
												<ArrowDropDownIcon
													style={{
														color:
															orderBy === column.id && order === 'desc'
																? 'black'
																: PURPLE_GRAY,
														fontSize: '1.3rem',
													}}
												/>
											</Box>
											<Typography
												variant="subtitle1"
												sx={{
													fontWeight: 'bold',
												}}
											>
												{column.label}
											</Typography>
										</Box>
									</StickyTableHead>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{processedRows.map(row => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
										{columns.map(column => {
											const value = row[column.id];
											return (
												<StickyTableHead
													key={column.id}
													align={column.align}
													sx={[
														isValidElement(value) && {
															'&:hover': {
																cursor: 'pointer',
															},
														},
													]}
													positionkey={column.id}
													thememode={selectedTheme}
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
												</StickyTableHead>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			{pagination && (
				<Box mt="20px">
					<BasicPagination
						count={pagination.count}
						handleOnChange={pagination.handleOnPaginationChange}
						currentPage={pagination.currentPage}
						size={matches ? 'medium' : 'small'}
						boundaryCount={matches ? 1 : 1}
						siblingCount={matches ? 1 : 0}
					/>
				</Box>
			)}
		</Box>
	);
};

export default BasicTable;

const StickyTableHead = styled(TableCell, {
	// Configure which props should be forwarded on DOM
	shouldForwardProp: prop => prop !== 'positionkey' || prop !== 'thememode',
	name: 'StickyTableHead',
	slot: 'Root',
})(({ positionkey, thememode }) => {
	return (
		['market_cap_rank', 'name'].includes(positionkey) && {
			position: 'sticky',
			left: 0,
			background: thememode === 'light' ? BLUE_GRAY : GRAY,
		}
	);
});
