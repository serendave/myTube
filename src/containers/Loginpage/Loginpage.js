import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import * as action from "../../store/actions/actionCreators/auth";

import { makeStyles } from "@material-ui/core/styles";

import image from "../../images/login-bg-1.jpg";
import LoginForm from "../../components/LoginForm/LoginForm";
import Modal from "../../components/UI/Modal/Modal";

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
        margin: "0 auto",
        width: "90%",
        [theme.breakpoints.up("sm")]: {
            width: 500
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
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/videos/search");
        }
    }, [props.history, isAuthenticated]);

    const onAuth = (email, password, isSignedUp) =>
        dispatch(action.authenticate(email, password, isSignedUp));
    const onClearError = () => dispatch(action.clearError());

    const toggleAuthStateHandler = () => {
        authState === "login" ? setAuthState("register") : setAuthState("login");
    };

    const authHandler = () => {
        onAuth(email, password, authState === "login");
    };

    const clearErrorHandler = () => {
        onClearError();
    };

    return (
        <div className={styles.page}>
            <div className={styles.content}>
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
            </div>
            <Modal
                title="Opps. Something went wrong during authentication"
                message={error}
                open={Boolean(error)}
                closed={clearErrorHandler}
            />
        </div>
    );
};

export default Login;
