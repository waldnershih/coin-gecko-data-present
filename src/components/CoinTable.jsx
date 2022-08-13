import React, { isValidElement } from 'react';
import {
	Typography,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';

// Customise the Table component based on the Material UI Table component.
// rows: [{id: {value, handleOnCellClick || null}, cellName: {value, handleOnCellClick || null}}]
// columns: [{id, label, align, minWidth, getColor || null, format || null, handleOnClick || null}]
const BasicTable = ({ rows, columns }) => {
	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 0 }}>
			<TableContainer>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
									onClick={column.handleOnClick}
								>
									<Typography
										variant="subtitle1"
										sx={{
											fontWeight: 'bold',
										}}
									>
										{column.label}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.id?.value}>
									{columns.map(column => {
										const { value, handleOnCellClick } = row[column.id];
										return (
											<TableCell
												key={column.id}
												align={column.align}
												onClick={
													handleOnCellClick
														? () => handleOnCellClick(row.id?.value)
														: null
												}
												sx={[
													handleOnCellClick && {
														'&:hover': {
															cursor: 'pointer',
														},
													},
												]}
											>
												{isValidElement(value) ? (
													value
												) : (
													<Typography
														variant="body1"
														sx={{
															color:
																column.getColor &&
																column.getColor(value),
														}}
													>
														{column.format && typeof value === 'number'
															? column.format(value)
															: value}
													</Typography>
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default BasicTable;
