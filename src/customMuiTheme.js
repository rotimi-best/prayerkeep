import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const customMuiTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        // fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",
        fontFamily: `'Lato',Helvetica,Arial,sans-serif`,
        h6: {
          color: '#5f6368',
          fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif;`
        }
        // "fontSize": 14,
        // "fontWeightLight": 300,
        // "fontWeightRegular": 400,
        // "fontWeightMedium": 500
    },
    palette: {
        primary: {
            main: '#f8b400',
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
});

export default customMuiTheme;
