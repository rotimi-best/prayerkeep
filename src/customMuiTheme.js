import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const customMuiTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif`,
        h6: {
            color: '#5f6368',
        }
    },
    palette: {
        primary: {
            main: '#f45d22',
            dark: '#715200',
            contrastText: '#fff',
            danger: '#cb2431'
        },
        secondary: {
            light: '#ffe398',
            main: '#E3B63F',
            contrastText: '#fff',
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    backgroundColor: '#fff'
                }
            }
        },
        MuiFab: {
            root: {
                width: 40,
                height: 40
            },
            primary: {
                color: '#000',
                backgroundColor: '#e0e0e0',
            },
        },
        MuiIconButton: {
            root: {
                padding: 5
            }
        }
    }
});

export default customMuiTheme;
