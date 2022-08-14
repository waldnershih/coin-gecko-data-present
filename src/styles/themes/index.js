import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();

export const responsiveFontSizesTheme = responsiveFontSizes(theme);

export { ThemeProvider };
