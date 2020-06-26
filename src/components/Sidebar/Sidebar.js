import React from "react";
import { NavLink } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FolderIcon from "@material-ui/icons/Folder";
import { Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCollection from "../AddElement/AddCollection/AddCollection";
import { useSelector } from "react-redux";

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
        "& > * > *": {
            margin: theme.spacing(1),
        },
        "& > * svg": {
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

    const customCollections = useSelector((state) => state.videos.collections);

    const collections = [];
    for (let collectionId in customCollections) {
        collections.push(collectionId);
    }

    const collectionsFolders = collections.map((collectionId) => {
        const link = `/videos/${collectionId}`;

        return (
            <NavLink to={link} key={collectionId}>
                <IconButton>
                    <FolderIcon />
                </IconButton>
            </NavLink>
        );
    });

    return (
        <div className={classes.sidebar}>
            <Divider />
            <Paper square className={classes.root}>
                <NavLink to="/videos/search">
                    <IconButton aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </NavLink>
                <NavLink to="/videos/favorites">
                    <IconButton aria-label="favorites">
                        <FavoriteIcon className={classes.favoriteIcon} />
                    </IconButton>
                </NavLink>
                <NavLink to="/videos/liked">
                    <IconButton aria-label="liked">
                        <ThumbUpIcon className={classes.likedIcon} />
                    </IconButton>
                </NavLink>
                {collectionsFolders}
                <div>
                    <AddCollection />
                </div>
            </Paper>
        </div>
    );
};

export default Sidebar;
