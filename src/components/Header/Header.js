import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as action from "../../store/actions/actionCreators/auth";

const useStyles = makeStyles({
    root: {
        alignItems: "center",
    },
    title: {
        flexGrow: 1,
    },
    user: {
        marginRight: 15,
    },
});

const Header = (props) => {
    const styles = useStyles();

    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    const userEmail = useSelector((state) => state.auth.userEmail);

    const dispatch = useDispatch();
    const onLogOut = () => dispatch(action.logOut());

    const logOut = () => {
        onLogOut();
    };

    let buttonLink = (
        <Button component={NavLink} to="/login">
            Login
        </Button>
    );

    if (isAuthenticated) {
        buttonLink = (
            <Button onClick={logOut} component={NavLink} to="/login">
                Logout
            </Button>
        );
    }

    return (
        <AppBar position="static">
            <Paper square>
                <Toolbar className={styles.root}>
                    <Typography variant="h6" className={styles.title}>
                        MyTube
                    </Typography>
                    {isAuthenticated ? (
                        <Typography variant="button" className={styles.user}>
                            Welcome, {userEmail}!
                        </Typography>
                    ) : null}
                    {buttonLink}
                </Toolbar>
            </Paper>
        </AppBar>
    );
};

export default Header;
