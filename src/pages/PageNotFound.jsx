import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { getAppBackgroundColor } from '../styles/colors';

const NotFound = () => {
	const { selectedTheme } = useSelector(state => state.settings);

	return (
		<Container
			maxWidth="xl"
			sx={{
				backgroundColor: getAppBackgroundColor(selectedTheme),
			}}
		>
			<Box
				sx={{
					minHeight: 'calc(100vh - 70px)',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
				pt="90px"
			>
				<Typography variant="h4" mb="20px" color="text.primary">
					Not Found - 404
				</Typography>
				<Link to="/">
					<Button>Go Home</Button>
				</Link>
			</Box>
		</Container>
	);
};

export default NotFound;
