import React from "react";
import { Box, Typography } from "@mui/material";
import { LIGHT_BLACK } from "../styles/colors";

const Header = () => {
	return (
		<Box
			sx={{
				height: "15vh",
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				// backgroundColor: BLUE_GRAY,
				borderBottom: `1px solid ${LIGHT_BLACK}`,
			}}
		>
			<Typography variant="h6">Header</Typography>
		</Box>
	);
};

export default Header;
