import React, { Fragment, useState } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Snackbar from "../../components/UI/Snackbar/Snackbar";

// React Router
import { NavLink } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../store/actions/actionCreators/auth";

// http saveData request
import axios from "axios";
import databaseUrl from "../../config/dataAPI/dataAPI";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
    },
    title: {
        flexGrow: 1,
    },
    headerElement: {
        marginRight: 10,
    },
    menuButton: (props) => ({
        marginRight: props.smallScreen ? 0 : 18,
    }),
    hide: {
        display: "none",
    },
    appBar: (props) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: props.smallScreen ? 56 : 64,
    }),
    appBarShift: (props) => ({
        marginLeft: props.sideBarWidth,
        width: `calc(100% - ${props.sideBarWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    toolBarPadding: {
        [theme.breakpoints.down("sm")]: {
            padding: "0 8px"
        }
    }
}));

const Header = (props) => {
    const styles = useStyles(props);
    const phoneScreen = useMediaQuery("(max-width: 500px)");

    const { sideBar, sideBarToggled, smallScreen } = props;
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [error, setError] = useState(null);

    // Redux state
    const userInfo = useSelector((state) => state.auth);
    const videosInfo = useSelector((state) => state.videos);

    const isAuthenticated = userInfo.token !== null;
    const userEmail = userInfo.userEmail;

    const dispatch = useDispatch();
    const onLogOut = () => dispatch(action.logOut());

    const logOutHandler = () => {
        onLogOut();
    };

    const openSnackBar = () => setSnackBarVisible(true);
    const closeSnackBar = () => setSnackBarVisible(false);

    const clearErrorHandler = () => {
        setError(null);
    };

    const saveDataHandler = () => {
        axios.put(`${databaseUrl}/users.json?auth=${userInfo.token}`, {
                [userInfo.userId]: {
                    ...videosInfo,
                },
            })
            .then((response) => {
                openSnackBar();
            })
            .catch((error) => {
                setError(error.response.data.error);
            });
    };

    let buttons = (
        <Button component={NavLink} to="/login" variant="outlined">
            Login
        </Button>
    );

    let menuButton = null;

    if (isAuthenticated) {
        buttons = (
            <Fragment>
                <Button
                    onClick={saveDataHandler}
                    className={styles.headerElement}
                    variant="outlined"
                    size={phoneScreen ? "small" : "medium"}
                >
                    Save Data
                </Button>
                <Button
                    onClick={logOutHandler}
                    variant="outlined"
                    component={NavLink}
                    to="/login"
                    size={phoneScreen ? "small" : "medium"}
                >
                    Logout
                </Button>
                <Snackbar visible={snackBarVisible} closed={closeSnackBar} message="Data saved successfully" />
            </Fragment>
        );
    }

    if (sideBar !== null && isAuthenticated) {
        menuButton = (
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={sideBarToggled}
                edge="start"
                className={clsx(styles.menuButton, { [styles.hide]: sideBar && !smallScreen })}
            >
                <MenuIcon />
            </IconButton>
        );
    }

    return (
        <AppBar
            position="static"
            className={clsx(styles.appBar, { [styles.appBarShift]: sideBar && !smallScreen })}
        >
            <Paper square>
                <Toolbar className={clsx(styles.root, styles.toolBarPadding)}>
                    {menuButton}
                    <Typography variant="h6" className={styles.title}>
                        MyTube
                    </Typography>
                    {isAuthenticated && !smallScreen ? (
                        <Typography variant="button" className={styles.headerElement}>
                            Welcome, {userEmail}!
                        </Typography>
                    ) : null}
                    {buttons}
                </Toolbar>
            </Paper>
            <Modal
                title="Opps. Something went wrong during saving collections"
                message={error}
                open={Boolean(error)}
                closed={clearErrorHandler}
            />
        </AppBar>
    );
};

export default Header;
