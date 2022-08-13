import React from 'react';
import { Box, Typography } from '@mui/material';
import { LIGHT_BLACK } from '../styles/colors';

const Footer = () => {
	return (
		<Box
			sx={{
				height: '15vh',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: LIGHT_BLACK,
				color: 'white',
			}}
		>
			<Box sx={{ maxWidth: '1440px' }}>
				<Typography variant="h6">Footer</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
