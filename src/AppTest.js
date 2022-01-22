import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFE169',
        },
        secondary: {
            main: '#000000',
        },
    },
});

function AppTest() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                aafgh
            </div>
        </ThemeProvider>
    );
}

export default AppTest;
