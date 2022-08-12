import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { DARK_GRAY } from "../styles/colors";

const Loading = ({ height, width, color }) => {
	return (
		<Box
			sx={{
				height: height,
				width: width,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress
				sx={{
					color: color || DARK_GRAY,
				}}
			/>
		</Box>
	);
};

export default Loading;
