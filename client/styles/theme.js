import { createTheme } from '@material-ui/core/styles';

// Theme colors for the website
const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#614AD3'
        },
        secondary: {
            main: '#E42C64'
        },
        background: {
            default: '#282B33'
        }
    }
});

export default theme;
