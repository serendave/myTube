import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#d50000",
        },
        secondary: {
            main: "#4e68fe",
        },
        background: {
            paper: "#2c3e50",
        },
        type: "dark",
    },
});

export default defaultTheme;
