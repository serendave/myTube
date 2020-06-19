import React from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Home from "../Home/Home";

import image from "../../images/homepage-bg-2.jpg";

const useStyles = makeStyles({
    page: {
        height: "calc(100% - 64px)",
        minHeight: "calc(100% - 64px)",
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    content: {
        height: "100%",
    },
});

const Homepage = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.page}>
            <Grid container className={classes.content}>
                <Grid item xs={1}>
                    <Sidebar />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                    <Home />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    );
};

export default Homepage;
