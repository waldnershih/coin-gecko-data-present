import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchCoins, fetchCoinsLength } from "../redux/slices/coinsSlice";

import { Box, Button, Typography } from "@mui/material";

import {
	BasicPagination,
	BasicTable,
	DataNotFound,
	Loading,
} from "../components";
import useQuery from "../hooks/useQuery";
import { DARK_GRAY } from "../styles/colors";

// Define the columns with specific rules for the table.
const columns = [
	{ id: "market_cap_rank", label: "Rank", minWidth: 100, align: "center" },
	{ id: "name", label: "Coin", minWidth: 170, align: "left" },
	{
		id: "current_price",
		label: "Price",
		minWidth: 170,
		align: "right",
		format: (value) =>
			value > 0.000001 ? `$${value}` : `${value.toFixed(12)}`, // Formatting if value is number.
	},
	{
		id: "price_change_percentage_1h_in_currency",
		label: "1h",
		minWidth: 100,
		align: "right",
		getColor: (value) =>
			value === "N/A" ? "" : value >= 0 ? "success.light" : "error.light",
		format: (value) => `${value.toFixed(1)}%`,
	},
	{
		id: "price_change_percentage_24h_in_currency",
		label: "24h",
		minWidth: 100,
		align: "right",
		getColor: (value) =>
			value === "N/A" ? "" : value >= 0 ? "success.light" : "error.light",
		format: (value) => `${value.toFixed(1)}%`,
	},
	{
		id: "price_change_percentage_7d_in_currency",
		label: "7d",
		minWidth: 100,
		align: "right",
		getColor: (value) =>
			value === "N/A" ? "" : value >= 0 ? "success.light" : "error.light",
		format: (value) => `${value.toFixed(1)}%`,
	},

	{
		id: "total_volume",
		label: "24h Volume",
		minWidth: 170,
		align: "right",
		format: (value) => `$${value.toLocaleString("en-US")}`,
	},
	{
		id: "market_cap",
		label: "Mkt Cap",
		minWidth: 170,
		align: "right",
		format: (value) => `$${value.toLocaleString("en-US")}`,
	},
	{
		id: "fully_diluted_valuation",
		label: "FDV",
		minWidth: 170,
		align: "right",
		format: (value) => `$${value.toLocaleString("en-US")}`,
	},
];

// Define the default sorting rules for the table.
const coinsPerPage = 50;
const coinsOrder = "market_cap_desc";
const coinsCategory = "";

const Coins = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let query = useQuery();
	const { coins, allCoinsLength, coinsLoading, allCoinsLengthLoading } =
		useSelector((state) => state.coins);

	// const [coinsCategory, setCoinsCategory] = useState("");
	// const [coinsVsCurrency, setCoinsVsCurrency] = useState("usd");
	// const [coinsOrder, setCoinsOrder] = useState("market_cap_desc"); // valid values: market_cap_desc, gecko_desc, gecko_asc, market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc
	const [coinsCurrentPage, setCoinsCurrentPage] = useState(-1); // prevent initial dispatch of fetchCoins to avoid async fetching error

	useEffect(() => {
		dispatch(fetchCoinsLength());
	}, [dispatch]);

	useEffect(() => {
		setCoinsCurrentPage(parseInt(query.get("page") || 1));
	}, [query, dispatch]);

	useEffect(() => {
		if (coinsCurrentPage === -1) return;
		dispatch(
			fetchCoins({
				coinsPerPage,
				coinsCategory,
				coinsOrder,
				coinsCurrentPage,
			})
		);
	}, [coinsCurrentPage, dispatch]);

	const handleOnPaginationChange = (event, value) => {
		navigate(`/coins?page=${value}`);
	};

	// Prevent keep rerender
	const handleOnValueClick = useMemo(
		() => (rowId) => {
			navigate(`/coins/${rowId}`);
		},
		[navigate]
	);

	// Process data to display in table, trigger only when handleOnValueClick is called and coins is updated.
	const createData = useMemo(
		() => (coin) => {
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
				fully_diluted_valuation,
			} = coin;

			// Combine image, name, symbol to name react-node
			const nameNode = (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						img: {
							width: "32px",
							height: "32x",
							marginRight: "10px",
						},
					}}
				>
					<img src={image} alt={name} loading="lazy" />
					<Typography
						variant="body1"
						ml={2}
						sx={{
							fontWeight: "bold",
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

			// Handle missing data
			return {
				id: { value: id },
				name: {
					value: nameNode || "N/A",
					handleOnValueClick: handleOnValueClick,
				},
				market_cap_rank: { value: market_cap_rank || "N/A" },
				current_price: { value: current_price || "0.00" },
				price_change_percentage_1h_in_currency: {
					value: price_change_percentage_1h_in_currency || "N/A",
				},
				price_change_percentage_24h_in_currency: {
					value: price_change_percentage_24h_in_currency || "N/A",
				},
				price_change_percentage_7d_in_currency: {
					value: price_change_percentage_7d_in_currency || "N/A",
				},
				total_volume: { value: total_volume || "N/A" },
				market_cap: { value: market_cap || "N/A" },
				fully_diluted_valuation: {
					value: fully_diluted_valuation || "N/A",
				},
			};
		},
		[handleOnValueClick]
	);

	// Process data to display in table, trigger only when createData is called and coins is updated.
	let rows = useMemo(() => {
		return coins.map((coin) => createData(coin));
	}, [coins, createData]);

	return (
		// evaluate loading first and then length of data
		<Box>
			{allCoinsLengthLoading || coinsLoading ? (
				<Loading height={"70vh"} width={"100%"} />
			) : rows.length > 0 ? (
				<Box
					sx={{
						minHeight: "70vh",
						width: "100%",
						overflow: "hidden",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Box
						p="20px"
						sx={{
							width: "100%",
						}}
					>
						<BasicTable rows={rows} columns={columns} />
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
						minHeight: "70vh",
						width: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<DataNotFound />

					<Button onClick={() => navigate(-1)}>Go Back</Button>
				</Box>
			)}
		</Box>
	);
};

export default Coins;
