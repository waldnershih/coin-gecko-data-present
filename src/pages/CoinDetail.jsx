import React, { useEffect } from "react";
import { Box } from "@mui/material";
import {
	useParams,
	// useLocation
} from "react-router-dom";

const CoinDetail = () => {
	const { id } = useParams();
	// const { pathname } = useLocation();

	useEffect(() => {
		console.log(id);
	}, [id]);

	return (
		<Box
			sx={{
				minHeight: "70vh",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			CoinDetail
		</Box>
	);
};

export default CoinDetail;
