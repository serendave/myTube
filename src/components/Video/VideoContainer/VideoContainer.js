import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import VideoItem from "../VideoItem/VideoItem";

const useStyles = makeStyles({
    root: {
        padding: 15,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gridGap: 15,
        backgroundColor: "#384f66",
    },
});

const VideoContainer = () => {
    const styles = useStyles();

    return (
        <Paper className={styles.root}>
            <VideoItem videoUrl="https://www.youtube.com/embed/WV6u_6ZNWkQ" />
            <VideoItem videoUrl="https://www.youtube.com/embed/eNhL644ybFw" />
            <VideoItem videoUrl="https://www.youtube.com/embed/JlxVAKP2cgw" />
            <VideoItem videoUrl="https://www.youtube.com/embed/eNhL644ybFw" />
            <VideoItem videoUrl="https://www.youtube.com/embed/JlxVAKP2cgw" />
            <VideoItem videoUrl="https://www.youtube.com/embed/WV6u_6ZNWkQ" />
        </Paper>
    );
};

export default VideoContainer;
