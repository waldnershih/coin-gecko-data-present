import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

import { ThemeProvider, responsiveFontSizesTheme } from '../styles/themes';

const NotFound = () => {
	return (
		<ThemeProvider theme={responsiveFontSizesTheme}>
			<Container maxWidth="xl">
				<Box
					sx={{
						minHeight: '90vh',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
					pt="90px"
				>
					<Typography variant="h4" mb="20px">
						Not Found - 404
					</Typography>
					<Link to="/">
						<Button>Go Home</Button>
					</Link>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default NotFound;
