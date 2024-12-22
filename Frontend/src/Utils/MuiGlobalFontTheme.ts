import { createTheme } from '@mui/material/styles';

// set global font for mui elements to override it's default:
const muiGlobalFontTheme = createTheme({
  typography: {
    fontFamily: "'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif",
  },
});

export default muiGlobalFontTheme;
