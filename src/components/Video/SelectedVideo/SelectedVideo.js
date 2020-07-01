import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "90%",
        margin: "1rem 0",
        padding: 20,
        borderRadius: 15,
        backgroundColor: "#384f66",
        display: "flex",
        flexDirection: "column",
    },
    gutter: {
        marginBottom: 20,
    },
    text: {
        color: "#fff",
    },
});

const SelectedVideo = (props) => {
    const styles = useStyles();

    const videoId = props.match.params.videoId;
    const videoTitle = useSelector((state) => state.videos.selectedVideo);

    return (
        <div className={styles.root}>
            <Typography variant="h3" noWrap={props.smallScreen ? true : false} className={styles.text}>
                {videoTitle}
            </Typography>
            <Divider className={styles.gutter} />
            <VideoItem videoId={videoId} videoHeight="100%" fullHeight />
        </div>
    );
};

export default SelectedVideo;
