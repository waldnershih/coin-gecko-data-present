import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const NotFound = () => {
	return (
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
			<Typography variant="h4" mb="20px">
				Not Found - 404
			</Typography>
			<Link to="/">
				<Button>Go Home</Button>
			</Link>
		</Box>
	);
};

export default NotFound;
