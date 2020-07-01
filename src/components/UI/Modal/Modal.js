import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    container: {
        padding: theme.spacing(2),
    },
    buttonBox: {
        width: "max-content",
        margin: "auto",
        marginTop: 15
    },
    button: {
        width: 100,
    },
    gutterBottom: {
        marginBottom: 20,
    },
}));

const Modal = (props) => {
    const styles = useStyles();

    const { open, closed, message, title } = props;

    let messageDisplay = message;

    if (message) {
        switch (true) {
            case (message === "EMAIL_NOT_FOUND"):
                messageDisplay = "You provided wrong data for signing in. Please, try again, or sign up first";
                break;
            case (message.indexOf("invalid combination of search filters") !== -1):
                messageDisplay = "There is some error in video filters. Please, try again later";
                break;
            default:
                break;
        }
    }

    return (
        <Backdrop className={styles.backdrop} open={open} onClick={closed}>
            <Paper className={styles.container}>
                <Typography variant="h5">{title}</Typography>
                <Divider className={styles.gutterBottom} />
                <Typography variant="body1" gutterBottom>
                    {messageDisplay}
                </Typography>
                <div className={styles.buttonBox}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={closed}
                        size="large"
                        className={styles.button}
                    >
                        OK
                    </Button>
                </div>
            </Paper>
        </Backdrop>
    );
};

export default Modal;
