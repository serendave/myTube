import React, { Fragment, useEffect, useCallback, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import theme from "./theme/default";

import { useDispatch, useSelector } from "react-redux";
import * as action from "./store/actions/actionCreators/auth";

import Mainpage from "./containers/Mainpage/Mainpage";
import Loginpage from "./containers/Loginpage/Loginpage";
import Header from "./components/Header/Header";

const sideBarWidth = 165;

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "inherit"
    }
});

const App = () => {
    const styles = useStyles();

    const dispatch = useDispatch();
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const openSideBarHandler = () => {
        setSideBarOpen(true);
    };

    const closeSideBarHandler = () => {
        setSideBarOpen(false);
    };

    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    const onTryAutoLogin = useCallback(() => dispatch(action.authCheckState()), [dispatch]);

    useEffect(() => {
        onTryAutoLogin();
        console.log(sideBarOpen);
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
                                sideBarWidth={sideBarWidth}
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
                    sideBarOpened={openSideBarHandler}
                    sideBarWidth={sideBarWidth}
                />
                {routes}
            </div>
        </ThemeProvider>
    );
};

export default App;
