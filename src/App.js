import React, { Fragment, useEffect, useCallback } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/default";

import { useDispatch, useSelector } from "react-redux";
import * as action from "./store/actions/actionCreators/auth";

import Mainpage from "./containers/Mainpage/Mainpage";
import Loginpage from "./containers/Loginpage/Loginpage";
import Header from "./components/Header/Header";

const App = () => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    const onTryAutoLogin = useCallback(() => dispatch(action.authCheckState()));

    useEffect(() => {
        console.log("Hello");
        onTryAutoLogin();
    }, [onTryAutoLogin]);

    let routes = (
        <Switch>
            <Route path="/login" component={Loginpage} />
        </Switch>
    );

    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/" exact component={Mainpage} />
                <Route path="/login" component={Loginpage} />
            </Switch>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Fragment>
                <Header />
                {routes}
            </Fragment>
        </ThemeProvider>
    );
};

export default App;
