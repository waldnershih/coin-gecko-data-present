import React from 'react';
import { Box } from '@mui/material';

// fixed the maxWidth for all pages
const PageWrapper = Components =>
	function HOC() {
		return (
			<Box
				sx={{
					display: 'flex',
					// flexDirection: "column",
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box sx={{ flex: 1, maxWidth: '1440px' }}>
					<Components />
				</Box>
			</Box>
		);
	};

export default PageWrapper;
