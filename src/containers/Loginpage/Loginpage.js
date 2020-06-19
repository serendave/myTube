import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import * as action from "../../store/actions/actionCreators/auth";

import { Grid, Typography, TextField, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import image from "../../images/login-bg-1.jpg";

const useStyles = makeStyles((theme) => ({
    page: {
        height: "100vh",
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
    content: {
        height: "calc(100% - 64px)",
    },
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

const Login = (props) => {
    const styles = useStyles();

    // useState
    const [authState, setAuthState] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Redux
    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    const dispatch = useDispatch();

    // Props
    const { history } = props;

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }
    }, [history, isAuthenticated]);

    const onAuth = (email, password, isSignedUp) =>
        dispatch(action.authenticate(email, password, isSignedUp));

    const toggleAuthState = () => {
        authState === "login" ? setAuthState("register") : setAuthState("login");
    };

    const authenticate = () => {
        onAuth(email, password, authState === "login");
    };

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <Grid container>
                    <Grid item xs={3} md={4}></Grid>
                    <Grid item xs={6} md={4}>
                        <Paper>
                            <figure className={styles.form}>
                                <Typography variant="h4" className={styles.title}>
                                    {authState === "login" ? "Sign in" : "Sign up"}
                                </Typography>
                                <TextField
                                    className={classNames(styles.controls, styles.input)}
                                    color="secondary"
                                    variant="outlined"
                                    type="email"
                                    label="Email"
                                    value={email}
                                    autoFocus
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    className={classNames(styles.controls, styles.input)}
                                    color="secondary"
                                    variant="outlined"
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className={classNames(styles.buttonBox, styles.controls, styles.root)}>
                                    <Button variant="contained" color="secondary" onClick={toggleAuthState}>
                                        {authState === "login" ? "Register" : "Login"}
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={authenticate}>
                                        {authState === "login" ? "Sign in" : "Sign up"}
                                    </Button>
                                </div>
                            </figure>
                        </Paper>
                    </Grid>
                    <Grid item xs={3} md={4}></Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Login;
