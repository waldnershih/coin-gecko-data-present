import React from 'react';

import {
	Box,
	Drawer,
	List,
	ListItem,
	Toolbar,
	IconButton,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	ButtonGroup,
	Button,
} from '@mui/material';

import { styled } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCurrency, setSelectedTheme } from '../redux/slices/settingsSlice';
import { dollarType } from '../constants/data';
import { Brightness5 as LightMode, Brightness2 as DarkMode, Close as CloseIcon } from '@mui/icons-material';

const BasicDrawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
	const dispatch = useDispatch();
	const { selectedCurrency, selectedTheme } = useSelector(state => state.settings);

	const handleOnCurrencyChange = event => {
		dispatch(setSelectedCurrency(event.target.value));
	};

	const handleOnThemeChange = () => {
		const newTheme = selectedTheme === 'light' ? 'dark' : 'light';
		dispatch(setSelectedTheme(newTheme));
	};

	return (
		<Drawer
			anchor="right"
			open={isDrawerOpen}
			onClose={() => setIsDrawerOpen(false)}
			SlideProps={{ unmountOnExit: true }}
		>
			<Box
				sx={{
					width: [200, 250],
				}}
				role="presentation"
				onKeyDown={() => setIsDrawerOpen(false)}
			>
				<Toolbar className="BasicDrawer__header">
					<Box
						sx={{
							flexGrow: 1,
							display: 'flex',
							justifyContent: 'end',
							svg: {
								width: '20px',
								height: '20px',
							},
						}}
					>
						<IconButton onClick={() => setIsDrawerOpen(false)}>
							<CloseIcon />
						</IconButton>
					</Box>
				</Toolbar>

				<List>
					<CustomiseListItem disablePadding key="currency-selector">
						<FormControl
							sx={{
								width: '100%',
							}}
							size="small"
						>
							<InputLabel id="currency-select-label">Currency</InputLabel>
							<Select
								labelId="currency-select-label"
								id="currency-select-label"
								value={selectedCurrency}
								onChange={handleOnCurrencyChange}
								autoWidth
								label="Currency"
							>
								{dollarType.map(type => (
									<MenuItem
										key={type.value}
										value={type.value}
										sx={{
											textTransform: 'capitalize',
											width: '170px',
										}}
									>
										<Typography>{type.label}</Typography>
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</CustomiseListItem>
					<CustomiseListItem disablePadding key="theme-mode">
						<ButtonGroup aria-label="outlined button group">
							<CustomiseButton
								variant={selectedTheme === 'light' ? 'contained' : 'outlined'}
								onClick={handleOnThemeChange}
								size="small"
								disableElevation
							>
								<LightMode />
								<Typography ml="5px">Light</Typography>
							</CustomiseButton>
							<CustomiseButton
								variant={selectedTheme === 'dark' ? 'contained' : 'outlined'}
								onClick={handleOnThemeChange}
								size="small"
								disableElevation
							>
								<DarkMode />
								<Typography ml="5px">Dark</Typography>
							</CustomiseButton>
						</ButtonGroup>
					</CustomiseListItem>
				</List>
			</Box>
		</Drawer>
	);
};

export default BasicDrawer;

const CustomiseListItem = styled(ListItem)({
	padding: '10px',
	margin: '10px 0',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

const CustomiseButton = styled(Button)({
	svg: {
		width: '18px',
		height: '18px',
	},
});
