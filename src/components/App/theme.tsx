/**
 * Our theme component
 * https://material-ui.com/customization/theming/
 */
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core"

const theme = createMuiTheme({
    palette: {
        primary: {
            // main: "#303f9f",
            main: "#1a237e",
            contrastText: "#ffffff",
        },
        secondary: {
            //main: "#8e24aa",
            main: "#B6BBFF",
        },
        text: {
            primary: "#555",
            secondary: "#999",
        },
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
})

export default responsiveFontSizes(theme)
