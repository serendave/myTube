import React from "react";

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FolderIcon from "@material-ui/icons/Folder";
// import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        width: 70,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    root: {
        height: "100%",
        "& > *": {
            margin: theme.spacing(1),
        },
        "& svg": {
            fontSize: 30,
        },
    },
    favoriteIcon: {
        fill: "#ffc107",
    },
    likedIcon: {
        fill: "#f50057",
    },
}));

const Sidebar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.sidebar}>
            <Divider />
            <Paper square className={classes.root}>
                <IconButton aria-label="search">
                    <SearchIcon />
                </IconButton>
                <IconButton aria-label="favorites">
                    <FavoriteIcon className={classes.favoriteIcon} />
                </IconButton>
                <IconButton aria-label="liked">
                    <ThumbUpIcon className={classes.likedIcon} />
                </IconButton>
                <IconButton aria-label="collection-1">
                    <FolderIcon />
                </IconButton>
                <IconButton aria-label="collection-2">
                    <FolderIcon />
                </IconButton>
            </Paper>
        </div>
    );
};

export default Sidebar;
