import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#4e68fe",
        },
        secondary: {
            main: "#d50000",
        },
        background: {
            paper: "#2c3e50",
        },
        type: "dark",
    },
});

export default defaultTheme;
