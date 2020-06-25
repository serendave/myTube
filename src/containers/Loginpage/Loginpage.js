import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import * as action from "../../store/actions/actionCreators/auth";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import image from "../../images/login-bg-1.jpg";
import LoginForm from "../../components/LoginForm/LoginForm";

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
    }
}));

const Login = (props) => {
    const styles = useStyles();

    // useState
    const [authState, setAuthState] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Redux
    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();

    // Props
    const { history } = props;

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/videos/search");
        }
    }, [history, isAuthenticated]);

    const onAuth = (email, password, isSignedUp) =>
        dispatch(action.authenticate(email, password, isSignedUp));

    const toggleAuthStateHandler = () => {
        authState === "login" ? setAuthState("register") : setAuthState("login");
    };

    const authHandler = () => {
        onAuth(email, password, authState === "login");
    };

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <Grid container>
                    <Grid item xs={3} md={4}></Grid>
                    <Grid item xs={6} md={4}>
                        <LoginForm
                            email={email}
                            password={password}
                            authState={authState} 
                            passwordChanged={setPassword} 
                            emailChanged={setEmail} 
                            authStateToggled={toggleAuthStateHandler}
                            authenticated={authHandler}
                            loading={loading}
                        />
                    </Grid>
                    <Grid item xs={3} md={4}></Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Login;
