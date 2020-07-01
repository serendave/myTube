import React, { Suspense, useState } from "react";

// Material UI
import { Card, CardContent, Typography, Divider, CardActions, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import AddIcon from "@material-ui/icons/Add";

// Redux
import * as actions from "../../../store/actions/actionCreators/videos";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: props => ({
        padding: theme.spacing(2),
        backgroundColor: "#2c3e50",
        flex: props.fullHeight ? 1 : "initial"
    }),
    videobox: props => ({
        width: "100%",
        height: props.videoHeight ?? 200,
    }),
    videotitle: {
        padding: `${theme.spacing(1)}px 2px`,
    },
    buttons: {
        justifyContent: "flex-end",
        alignItems: "center",
    },
    favoriteIcon: {
        fill: "#ffc107",
    },
    likedIcon: {
        fill: "#f50057",
    },
}));

const AddVideoMenu = React.lazy(() => import("../AddVideo/AddVideo"));

const VideoItem = React.memo((props) => {
    const styles = useStyles(props);
    const [anchorEl, setAnchorEl] = useState(false);

    const { videoId, title } = props;

    const isVideoFavorite = useSelector((state) => isVideoPresent(state.videos.favorites, videoId));
    const isVideoLiked = useSelector((state) => isVideoPresent(state.videos.liked, videoId));

    function isVideoPresent(collection, videoId) {
        for (let id in collection) {
            if (id === videoId) {
                return true;
            }
        }
        return false;
    }

    const dispatch = useDispatch();
    const onFavoritesAdd = () => dispatch(actions.favoritesAdd(videoId, title));
    const onFavoritesRemove = () => dispatch(actions.favoritesRemove(videoId));
    const onLikedAdd = () => dispatch(actions.likedAdd(videoId, title));
    const onLikedRemove = () => dispatch(actions.likedRemove(videoId));
    const onVideoSelect = (videoTitle) => dispatch(actions.selectVideo(videoTitle)); 

    const openMenuHandler = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenuHandler = () => {
        setAnchorEl(null);
    };

    const fullScreenClickedHandler = () => {
        props.history.push("/videos/selected-video/" + videoId);
        onVideoSelect(title);
    };

    let addVideoButton = (
        <IconButton aria-controls="add-video" aria-haspopup="true" size="small" onClick={openMenuHandler}>
            <AddIcon />
        </IconButton>
    );

    let favoriteButton = (
        <IconButton size="small" onClick={onFavoritesAdd}>
            <FavoriteIcon />
        </IconButton>
    );

    let likedButton = (
        <IconButton size="small" onClick={onLikedAdd}>
            <ThumbUpIcon />
        </IconButton>
    );

    if (isVideoFavorite) {
        favoriteButton = (
            <IconButton size="small" onClick={onFavoritesRemove}>
                <FavoriteIcon className={styles.favoriteIcon} />
            </IconButton>
        );
    }

    if (isVideoLiked) {
        likedButton = (
            <IconButton size="small" onClick={onLikedRemove}>
                <ThumbUpIcon className={styles.likedIcon} />
            </IconButton>
        );
    }

    let menu = null;

    if (anchorEl) {
        menu = (
            <Suspense fallback={null}>
                <AddVideoMenu
                    videoId={videoId}
                    anchorEl={anchorEl}
                    closeMenuHandler={closeMenuHandler}
                    title={title}
                />
            </Suspense>
        );
    }

    return (
        <Card className={styles.root}>
            <div className={styles.videobox}>
                <iframe
                    title={title}
                    width="100%"
                    height="100%"
                    src={"https://www.youtube.com/embed/" + videoId}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                />
            </div>
            <Divider />
            <CardContent className={styles.videotitle}>
                <Typography variant="h6" noWrap>
                    {title}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions className={styles.buttons}>
                {likedButton}
                {favoriteButton}
                {addVideoButton}
                {menu}
                <IconButton size="small" onClick={fullScreenClickedHandler}>
                    <FullscreenIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
});

export default withRouter(VideoItem);
