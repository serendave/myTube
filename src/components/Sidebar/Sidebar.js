import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";

// Material UI
import { Divider, Drawer, List, CssBaseline, ListItemSecondaryAction } from "@material-ui/core";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import AddCollection from "../Collection/AddCollection/AddCollection";

// Material UI icons
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import FolderIcon from "@material-ui/icons/Folder";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteCollection from "../Collection/DeleteCollection/DeleteCollection";

const useStyles = makeStyles((theme) => ({
    sideBar: (props) => ({
        width: props.sideBarWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        minHeight: "inherit",
        height: 1,
        "& .MuiListItemSecondaryAction-root": {
            opacity: 0,
            visibility: "hidden",
        },
    }),
    sideBarOpen: (props) => ({
        width: props.sideBarWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    sideBarClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(8) + 1,
        // [theme.breakpoints.up("sm")]: {
        //     width: theme.spacing(9) + 1,
        // },
    },
    paper: {
        position: "static",
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    favoriteIcon: {
        fill: "#ffc107",
    },
    likedIcon: {
        fill: "#f50057",
    },
    listItemIcon: {
        minWidth: 46,
    },
    listItemSecondary: {
        right: 8,
        transition: "all .3s",
        "& svg": {
            fontSize: "1.2rem",
        },
    },
    listItem: {
        "&:hover .MuiListItemSecondaryAction-root": {
            opacity: 1,
            visibility: "visible",
        },
    },
}));

const CustomListItemIcon = withStyles({
    root: {
        minWidth: 50,
    },
})((props) => <ListItemIcon {...props} />);

const Sidebar = (props) => {
    const styles = useStyles(props);
    const theme = useTheme();

    const { open, sideBarClosed } = props;

    const customCollections = useSelector((state) => state.videos.collections);

    const collections = [];
    for (let collectionId in customCollections) {
        collections.push({ name: customCollections[collectionId].name, id: collectionId });
    }

    const collectionsFolders = collections.map((collection) => {
        const link = `/videos/${collection.id}`;

        let name = collection.name;
        if (collection.name.length >= 8) {
            name = collection.name.substr(0, 7) + "...";
        }

        return (
            <NavLink to={link} key={collection.id} className={clsx({ [styles.listItem]: open })}>
                <ListItem button>
                    <CustomListItemIcon>
                        <FolderIcon />
                    </CustomListItemIcon>
                    <ListItemText primary={name} />
                    <ListItemSecondaryAction className={styles.listItemSecondary}>
                        <DeleteCollection collectionId={collection.id} />
                    </ListItemSecondaryAction>
                </ListItem>
            </NavLink>
        );
    });

    return (
        <Drawer
            variant="permanent"
            className={clsx(styles.sideBar, {
                [styles.sideBarOpen]: open,
                [styles.sideBarClose]: !open,
            })}
            classes={{
                paper: clsx(styles.paper, {
                    [styles.sideBarOpen]: open,
                    [styles.sideBarClose]: !open,
                }),
            }}
            style={{
                marginTop: -64,
                height: "calc(100% + 64px)",
            }}
        >
            <div className={styles.toolbar}>
                <IconButton onClick={sideBarClosed}>
                    {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <CssBaseline />
            <List>
                <NavLink to="/videos/search">
                    <ListItem button>
                        <CustomListItemIcon>
                            <SearchIcon />
                        </CustomListItemIcon>
                        <ListItemText primary="Search" />
                    </ListItem>
                </NavLink>
                <NavLink to="/videos/favorites">
                    <ListItem button>
                        <CustomListItemIcon>
                            <FavoriteIcon className={styles.favoriteIcon} />
                        </CustomListItemIcon>
                        <ListItemText primary="Favorites" />
                    </ListItem>
                </NavLink>
                <NavLink to="/videos/liked">
                    <ListItem button>
                        <CustomListItemIcon>
                            <ThumbUpIcon className={styles.likedIcon} />
                        </CustomListItemIcon>
                        <ListItemText primary="Liked" />
                    </ListItem>
                </NavLink>
                <Divider />
                {collectionsFolders}
                <Divider />
                <AddCollection />
            </List>
        </Drawer>
    );
};

export default Sidebar;
