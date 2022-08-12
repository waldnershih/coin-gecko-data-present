import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

const Home = () => {
	return (
		<Box
			sx={{
				minHeight: "70vh",
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Link to="/coins">
				<Button>Go To Coins Table</Button>
			</Link>
		</Box>
	);
};

export default Home;
