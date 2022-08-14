import React from 'react';
import { Pagination } from '@mui/material';

// Customise the Pagination component based on the Material UI Pagination component.
const BasicPagination = ({ count, handleOnChange, currentPage, size, siblingCount, boundaryCount }) => {
	return (
		<Pagination
			count={count}
			color="primary"
			variant="outlined"
			shape="rounded"
			onChange={handleOnChange}
			defaultPage={1}
			page={currentPage}
			size={size}
			siblingCount={siblingCount}
			boundaryCount={boundaryCount}
		/>
	);
};

export default BasicPagination;
