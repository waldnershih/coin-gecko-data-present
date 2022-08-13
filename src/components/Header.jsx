import React from 'react';
import { Box, Typography } from '@mui/material';

const Header = () => {
	return (
		<Box
			sx={{
				height: '15vh',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Box sx={{ maxWidth: '1440px' }}>
				<Typography variant="h6">Header</Typography>
			</Box>
		</Box>
	);
};

export default Header;
