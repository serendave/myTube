import React, { Fragment } from "react";
import { Typography, TextField, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Spinner from "../UI/Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
    form: {
        padding: 30,
        borderRadius: 5,
        opacity: 0.8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        minHeight: 300,
    },
    title: {
        marginBottom: "30px",
    },
    buttonBox: {
        display: "flex",
    },
    input: {
        "&:hover": {
            boxShadow: "0 0 1px blue",
        },
    },
    controls: {
        margin: "5px 0",
    },
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

const LoginForm = (props) => {
    const styles = useStyles();
    const { passwordChanged, emailChanged, authStateToggled, authenticated } = props;

    let formContent = (
        <Fragment>
            <Typography variant="h4" className={styles.title}>
                {props.authState === "login" ? "Sign in" : "Sign up"}
            </Typography>
            <TextField
                className={classNames(styles.controls, styles.input)}
                color="primary"
                variant="outlined"
                type="email"
                label="Email"
                value={props.email}
                autoFocus
                onChange={(e) => emailChanged(e.target.value)}
            />
            <TextField
                className={classNames(styles.controls, styles.input)}
                color="primary"
                variant="outlined"
                type="password"
                label="Password"
                value={props.password}
                onChange={(e) => passwordChanged(e.target.value)}
            />
            <div className={classNames(styles.buttonBox, styles.controls, styles.root)}>
                <Button variant="contained" color="primary" onClick={authStateToggled}>
                    {props.authState === "login" ? "Register" : "Login"}
                </Button>
                <Button variant="contained" color="primary" onClick={authenticated}>
                    {props.authState === "login" ? "Sign in" : "Sign up"}
                </Button>
            </div>
        </Fragment>
    );

    if (props.loading) {
        formContent = <Spinner color="primary" size="100px" centered="true" />;
    }

    return (
        <Paper>
            <figure className={styles.form}>{formContent}</figure>
        </Paper>
    );
};

export default LoginForm;
