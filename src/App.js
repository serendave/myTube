import React, { Fragment, useEffect, useCallback, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import theme from "./theme/default";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";
import * as action from "./store/actions/actionCreators/auth";

import Mainpage from "./containers/Mainpage/Mainpage";
import Loginpage from "./containers/Loginpage/Loginpage";
import Header from "./components/Header/Header";

const sideBarOpenedWidth = 165;
const sideBarClosedWidth = 65;

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "inherit"
    }
});

const App = () => {
    const styles = useStyles();
    const smallScreen = useMediaQuery("(max-width: 800px");
    const phoneScreen = useMediaQuery("(max-width: 500px");

    const dispatch = useDispatch();
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const toggleSideBarHandler = () => {
        setSideBarOpen(!sideBarOpen)
    }

    const closeSideBarHandler = () => {
        setSideBarOpen(false);
    };

    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    const onTryAutoLogin = useCallback(() => dispatch(action.authCheckState()), [dispatch]);

    useEffect(() => {
        onTryAutoLogin();
    }, [onTryAutoLogin, sideBarOpen]);

    let routes = (
        <Fragment>
            <Redirect to="/login" />
            <Route path="/login" component={Loginpage} />
        </Fragment>
    );

    if (isAuthenticated) {
        routes = (
            <Fragment>
                <Redirect to="/videos" />
                <Switch>
                    <Route
                        path="/videos"
                        render={(props) => (
                            <Mainpage
                                {...props}
                                sideBar={sideBarOpen}
                                sideBarClosed={closeSideBarHandler}
                                sideBarOpenedWidth={sideBarOpenedWidth}
                                sideBarClosedWidth={sideBarClosedWidth}
                                smallScreen={smallScreen}
                                phoneScreen={phoneScreen}
                            />
                        )}
                    />
                    <Route path="/login" component={Loginpage} />
                </Switch>
            </Fragment>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.root}>
                <Header
                    sideBar={sideBarOpen}
                    sideBarToggled={toggleSideBarHandler}
                    sideBarWidth={sideBarOpenedWidth}
                    smallScreen={smallScreen}
                />
                {routes}
            </div>
        </ThemeProvider>
    );
};

export default App;
