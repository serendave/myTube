import React from "react";
import { Card, CardContent, Typography, Divider, CardActions, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddIcon from "@material-ui/icons/Add";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

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
}));

const VideoItem = (props) => {
    const styles = useStyles();

    const { videoUrl } = props;

    return (
        <Card className={styles.root}>
            <div className={styles.videobox}>
                <iframe
                    title="title-1"
                    width="100%"
                    height="100%"
                    src={videoUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <Divider />
            <CardContent className={styles.videotitle}>
                <Typography variant="h6">Video Title</Typography>
            </CardContent>
            <Divider />
            <CardActions className={styles.buttons}>
                <IconButton size="small">
                    <ThumbUpIcon />
                </IconButton>
                <IconButton size="small">
                    <FavoriteIcon />
                </IconButton>
                <IconButton size="small">
                    <AddIcon />
                </IconButton>
                <IconButton size="small">
                    <FullscreenIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default VideoItem;
