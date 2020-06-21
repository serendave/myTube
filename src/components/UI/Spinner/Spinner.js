import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
    root: props => {
        const defaultStyle = {
            width: "100%",
            height: "100%"
        };

        if (props.centered) {
            defaultStyle.display = "flex";
            defaultStyle.justifyContent = "center";
            defaultStyle.alignItems = "center";
        }

        return defaultStyle;
    },
    spinner: {
        fontSize: 35,
    },
});

const Spinner = (props) => {
    const styles = useStyles(props);

    return (
        <div className={styles.root}>
            <CircularProgress {...props} className={styles.spinner} />
        </div>
    );
};

export default Spinner;
