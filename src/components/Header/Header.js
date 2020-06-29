import React, { Fragment, useState } from "react";

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
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";

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
    snackBar: {
        "& > *": {
            backgroundColor: "#2c3e50",
            color: "#fff",
        },
    },
    successIcon: {
        fill: "#4caf50",
    },
    menuButton: {
        marginRight: 18,
    },
    hide: {
        display: "none",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 64
    },
    appBarShift: (props) => ({
        marginLeft: props.sideBarWidth,
        width: `calc(100% - ${props.sideBarWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Header = (props) => {
    const styles = useStyles(props);

    const { sideBar, sideBarOpened } = props;
    const [snackBarVisible, setSnackBarVisible] = useState(false);

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

    const saveDataHandler = () => {
        axios
            .put(`${databaseUrl}/users.json?auth=${userInfo.token}`, {
                [userInfo.userId]: {
                    ...videosInfo,
                },
            })
            .then((response) => {
                openSnackBar();
            })
            .catch((error) => {
                console.log(error);
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
                <Button onClick={saveDataHandler} className={styles.headerElement} variant="outlined">
                    Save Data
                </Button>
                <Button onClick={logOutHandler} variant="outlined" component={NavLink} to="/login">
                    Logout
                </Button>
                <Paper>
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        open={snackBarVisible}
                        autoHideDuration={2500}
                        classes={{
                            root: styles.snackBar,
                        }}
                        onClose={closeSnackBar}
                        message="Data saved successfully"
                        action={
                            <IconButton size="small" color="inherit">
                                <CheckCircleIcon fontSize="small" className={styles.successIcon} />
                            </IconButton>
                        }
                    />
                </Paper>
            </Fragment>
        );
    }

    if (sideBar !== null && isAuthenticated) {
        menuButton = (
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={sideBarOpened}
                edge="start"
                className={clsx(styles.menuButton, { [styles.hide]: sideBar })}
            >
                <MenuIcon />
            </IconButton>
        );
    }

    return (
        <AppBar position="static" className={clsx(styles.appBar, { [styles.appBarShift]: sideBar })}>
            <Paper square>
                <Toolbar className={styles.root}>
                    {menuButton}
                    <Typography variant="h6" className={styles.title}>
                        MyTube
                    </Typography>
                    {isAuthenticated ? (
                        <Typography variant="button" className={styles.headerElement}>
                            Welcome, {userEmail}!
                        </Typography>
                    ) : null}
                    {buttons}
                </Toolbar>
            </Paper>
        </AppBar>
    );
};

export default Header;
