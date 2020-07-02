import React, { useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/actionCreators/videos";

import Sidebar from "../../components/Sidebar/Sidebar";
import Home from "../Home/Home";
import Collection from "../Collection/Collection";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import image from "../../images/homepage-bg-2.jpg";
import SelectedVideo from "../../components/Video/SelectedVideo/SelectedVideo";

const useStyles = makeStyles((theme) => ({
    page: {
        minHeight: "inherit",
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    content: {
        minHeight: "inherit",
        display: "flex",
    },
    mainContent: (props) => {
        let sideBarWidth = props.sideBar ? props.sideBarOpenedWidth : props.sideBarClosedWidth;

        if (props.smallScreen) {
            sideBarWidth = 0;
        }

        let width = `calc(90% - ${sideBarWidth}px)`;
        
        if (props.phoneScreen) {
            width = "100%";
        }

        return {
            width,
            margin: "0 auto",
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        };
    },
    sideBar: (props) => {
        let width = props.sideBar ? props.sideBarOpenedWidth : props.sideBarClosedWidth;

        if (props.smallScreen) {
            width = 0;
        }

        return {
            minHeight: "inherit",
            flexBasis: 0,
            width,
        };
    },
}));

const Mainpage = (props) => {
    const styles = useStyles(props);

    const { sideBar, sideBarClosed, sideBarOpenedWidth, smallScreen } = props;

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
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.sideBar}>
                    <Sidebar
                        open={sideBar}
                        sideBarClosed={sideBarClosed}
                        sideBarWidth={sideBarOpenedWidth}
                        smallScreen={smallScreen}
                    />
                </div>
                <div className={styles.mainContent}>
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
                        <Route
                            path="/videos/selected-video/:videoId"
                            render={(props) => <SelectedVideo {...props} smallScreen={smallScreen} />}
                        />
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Mainpage;
