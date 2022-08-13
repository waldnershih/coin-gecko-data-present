import React from 'react';
import { Pagination } from '@mui/material';

// Customise the Pagination component based on the Material UI Pagination component.
const BasicPagination = ({ count, handleOnChange, currentPage }) => {
	return (
		<Pagination
			count={count}
			color="primary"
			variant="outlined"
			shape="rounded"
			onChange={handleOnChange}
			defaultPage={1}
			page={currentPage}
			showFirstButton
			showLastButton
		/>
	);
};

export default BasicPagination;
