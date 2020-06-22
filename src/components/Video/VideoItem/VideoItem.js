import React from "react";

// Material UI
import { Card, CardContent, Typography, Divider, CardActions, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddIcon from "@material-ui/icons/Add";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

// Redux
import * as actions from "../../../store/actions/actionCreators/videos";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: "#2c3e50",
    },
    videobox: {
        width: "100%",
        height: 200,
    },
    videotitle: {
        padding: `${theme.spacing(1)}px 2px`,
    },
    buttons: {
        justifyContent: "flex-end",
    },
    favoriteIcon: {
        fill: "#ffc107",
    },
    likedIcon: {
        fill: "#f50057",
    },
}));

const VideoItem = React.memo((props) => {
    const styles = useStyles();
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
                <FavoriteIcon  className={styles.favoriteIcon} />
            </IconButton>
        );
    }

    if (isVideoLiked) {
        likedButton = (
            <IconButton size="small" onClick={onLikedRemove}>
                <ThumbUpIcon  className={styles.likedIcon} />
            </IconButton>
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
                <IconButton size="small">
                    <AddIcon />
                </IconButton>
                <IconButton size="small">
                    <FullscreenIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
});

export default VideoItem;
