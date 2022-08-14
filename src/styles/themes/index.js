import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#fff',
		},
	},
});

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		text: {},
	},
});

export const responsiveDarkTheme = responsiveFontSizes(darkTheme);
export const responsiveLightTheme = responsiveFontSizes(lightTheme);

export { ThemeProvider };
