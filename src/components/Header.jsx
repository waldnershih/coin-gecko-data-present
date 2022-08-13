import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, AppBar, Toolbar, Container, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import { Brightness5 as LightMode, Brightness2 as DarkMode } from '@mui/icons-material';
import { LogoBlue } from '../assets';
import { setSelectedCurrency, setSelectedTheme } from '../redux/slices/settingsSlice';

const dollarType = [
	{
		value: 'usd',
		label: 'USD',
	},
	{
		value: 'aud',
		label: 'AUD',
	},
	{
		value: 'eur',
		label: 'EUR',
	},
];

const Header = () => {
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
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="absolute"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
				color="inherit"
				elevation={2}
			>
				<Container maxWidth="xl" sx={{ padding: '15px 20px' }}>
					<Toolbar variant="dense">
						<Box sx={{ flexGrow: 1 }}>
							<Link to="/">
								<img src={LogoBlue} alt="logo-light-mode" height={24} />
							</Link>
						</Box>
						<FormControl sx={{ m: 1, minWidth: 80 }} size="small">
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
									<MenuItem key={type.value} value={type.value}>
										{type.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Button ml="15px" onClick={handleOnThemeChange}>
							{selectedTheme === 'light' ? <LightMode /> : <DarkMode />}
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
};

export default Header;
