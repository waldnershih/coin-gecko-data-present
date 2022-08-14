import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { DARK_GRAY } from '../styles/colors';
import { useSelector } from 'react-redux';

const Loading = ({ height, width, color }) => {
	const { selectedTheme } = useSelector(state => state.settings);
	return (
		<Box
			sx={{
				height: height,
				width: width,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CircularProgress
				sx={{
					color: color || selectedTheme === 'dark' ? '#fff' : DARK_GRAY,
				}}
			/>
		</Box>
	);
};

export default Loading;
