import React, { useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/actionCreators/videos";

import Sidebar from "../../components/Sidebar/Sidebar";
import Home from "../Home/Home";
import Collection from "../Collection/Collection";

// Material UI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import image from "../../images/homepage-bg-2.jpg";
import SelectedVideo from "../../components/Video/SelectedVideo/SelectedVideo";
const useStyles = makeStyles({
    page: {
        minHeight: "inherit",
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    content: {
        minHeight: "inherit",
    },
    heightFix: {
        minHeight: "inherit",
    },
});

const Mainpage = (props) => {
    const classes = useStyles();

    const { sideBar, sideBarClosed, sideBarWidth } = props;

    // Redux
    const userInfo = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const onCollectionsFetch = useCallback(
        (token, userId) => dispatch(actions.fetchCollections(token, userId)),
        [dispatch]
    );

    useEffect(() => {
        onCollectionsFetch(userInfo.token, userInfo.userId);
    }, [onCollectionsFetch, userInfo.token, userInfo.userId]);

    return (
        <div className={classes.page}>
            <Grid container className={classes.content}>
                <Grid item xs={2} className={classes.heightFix}>
                    <Sidebar open={sideBar} sideBarClosed={sideBarClosed} sideBarWidth={sideBarWidth} />
                </Grid>
                <Grid item xs={9}>
                    <Switch>
                        <Route path="/videos/search" component={Home} />
                        <Route
                            path="/videos/favorites"
                            render={(props) => <Collection {...props} type="favorites" />}
                        />
                        <Route
                            path="/videos/liked"
                            render={(props) => <Collection {...props} type="liked" />}
                        />
                        <Route
                            path="/videos/:id"
                            exact
                            render={(props) => <Collection {...props} type="custom" />}
                        />
                        <Route path="/videos/selected-video/:videoId" component={SelectedVideo} />
                    </Switch>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    );
};

export default Mainpage;
