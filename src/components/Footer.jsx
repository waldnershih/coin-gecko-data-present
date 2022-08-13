import React from 'react';
import { Box, Typography } from '@mui/material';
import { LIGHT_BLACK } from '../styles/colors';
import { styled } from '@mui/material/styles';

const FooterWrapper = styled(Box)(({ theme }) => ({
	height: '10vh',
	width: '100%',
	display: 'flex',
	backgroundColor: LIGHT_BLACK,
	color: 'white',
	[theme.breakpoints.down('md')]: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	[theme.breakpoints.up('md')]: {
		justifyContent: 'end',
		alignItems: 'end',
	},
}));

const Footer = () => {
	return (
		<FooterWrapper pr="20px" pb="20px">
			<Box sx={{ maxWidth: '1440px' }}>
				<Typography variant="subtitle1">© 2022 Waldner. All Rights Reserved.</Typography>
			</Box>
		</FooterWrapper>
	);
};

export default Footer;
