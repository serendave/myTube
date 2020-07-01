import React from "react";

import { Paper, Snackbar as MUISnackbar, makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
    snackBar: {
        "& > *": {
            backgroundColor: "#2c3e50",
            color: "#fff",
        },
    },
    successIcon: {
        fill: "#4caf50",
    }
});

const Snackbar = (props) => {
    const styles = useStyles();

    return (
        <Paper>
            <MUISnackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                open={props.visible}
                autoHideDuration={2500}
                classes={{
                    root: styles.snackBar,
                }}
                onClose={props.closed}
                message={props.message}
                action={
                    <IconButton size="small" color="inherit">
                        <CheckCircleIcon fontSize="small" className={styles.successIcon} />
                    </IconButton>
                }
            />
        </Paper>
    );
};

export default Snackbar;
