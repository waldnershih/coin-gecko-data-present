import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	Box,
	AppBar,
	Toolbar,
	Container,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Typography,
	IconButton,
} from '@mui/material';
import {
	Brightness5 as LightMode,
	Brightness2 as DarkMode,
	MoreVert as MoreVertIcon,
	Home as HomeIcon,
} from '@mui/icons-material';

import { LogoBlue, LogoWhite } from '../constants/assets';
import { setSelectedCurrency, setSelectedTheme } from '../redux/slices/settingsSlice';
import { styled } from '@mui/material/styles';
import { dollarType } from '../constants/data';

import { getHeaderBackgroundColor } from '../styles/colors';

const Header = ({ setIsDrawerOpen }) => {
	const dispatch = useDispatch();
	const { selectedCurrency, selectedTheme } = useSelector(state => state.settings);
	const navigate = useNavigate();

	const handleOnCurrencyChange = event => {
		dispatch(setSelectedCurrency(event.target.value));
	};

	const handleOnThemeChange = () => {
		const newTheme = selectedTheme === 'light' ? 'dark' : 'light';
		dispatch(setSelectedTheme(newTheme));
	};

	const handleOnHomeClick = () => {
		navigate('/');
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="absolute"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: getHeaderBackgroundColor(selectedTheme),
				}}
				color="inherit"
				elevation={2}
			>
				<CostomiseContainer maxWidth="xl">
					<Toolbar variant="dense">
						<ImageBox>
							<Link to="/">
								<img
									src={selectedTheme === 'light' ? LogoBlue : LogoWhite}
									alt="logo-light-mode"
									height={24}
								/>
							</Link>
						</ImageBox>
						<HomeIconBox>
							<IconButton onClick={handleOnHomeClick} color="primary">
								<HomeIcon />
							</IconButton>
						</HomeIconBox>

						<OptionBox>
							<FormControl sx={{ minWidth: 80 }} size="small">
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
											<Typography>{type.label}</Typography>
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<IconButton onClick={handleOnThemeChange} color="primary">
								{selectedTheme === 'light' ? <LightMode /> : <DarkMode />}
							</IconButton>
						</OptionBox>
						<SettingIconButton onClick={() => setIsDrawerOpen(preState => !preState)} color="primary">
							<MoreVertIcon />
						</SettingIconButton>
					</Toolbar>
				</CostomiseContainer>
			</AppBar>
		</Box>
	);
};

export default Header;

const CostomiseContainer = styled(Container)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		padding: '10px 0',
	},
	[theme.breakpoints.up('sm')]: {
		padding: '15px 20px',
	},
}));

const ImageBox = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	[theme.breakpoints.down('sm')]: {
		display: 'none',
	},
	[theme.breakpoints.down('md')]: {
		img: {
			height: '20px',
		},
	},
	[theme.breakpoints.up('md')]: {
		img: {
			height: '24px',
		},
	},
}));

const HomeIconBox = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	[theme.breakpoints.down('sm')]: {
		display: 'flex',
		alignItems: 'center',
	},
	[theme.breakpoints.up('sm')]: {
		display: 'none',
	},
}));

const OptionBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	[theme.breakpoints.down('sm')]: {
		display: 'none',
	},
	[theme.breakpoints.up('sm')]: {
		display: 'flex',
	},
}));

const SettingIconButton = styled(IconButton)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	[theme.breakpoints.down('sm')]: {
		display: 'flex',
	},
	[theme.breakpoints.up('sm')]: {
		display: 'none',
	},
}));
