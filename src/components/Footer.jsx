import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { getFooterBackgroundColor } from '../styles/colors';

const Footer = () => {
	const { selectedTheme } = useSelector(state => state.settings);
	return (
		<FooterWrapper thememode={selectedTheme}>
			<Box sx={{ maxWidth: '1440px' }} p="15px">
				<Typography variant="subtitle1">© 2022 Waldner. All Rights Reserved.</Typography>
			</Box>
		</FooterWrapper>
	);
};

export default Footer;

const FooterWrapper = styled(Box)(({ theme, thememode }) => ({
	height: '70px',
	width: '100%',
	display: 'flex',
	backgroundColor: getFooterBackgroundColor(thememode),
	color: 'white',
	borderTop: thememode === 'dark' && `1px solid white`,
	[theme.breakpoints.down('md')]: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	[theme.breakpoints.up('md')]: {
		justifyContent: 'end',
		alignItems: 'end',
	},
}));
