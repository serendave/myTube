import React from "react";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import VideoItem from "../VideoItem/VideoItem";

const useStyles = makeStyles({
    root: {
        padding: 15,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gridGap: 15,
        backgroundColor: "#384f66",
        minHeight: 350,
        position: "relative"
    },
    message: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
});

const VideoContainer = (props) => {
    const styles = useStyles();
    const { videos } = props;

    let content = (
        <Typography variant="h5" align="center" className={styles.message}>
            Type something in the search bar to see the results
        </Typography>
    );

    if (videos.length > 0) {
        content = (
            <React.Fragment>
                {videos.map(video => { 
                    return (
                        <VideoItem 
                            videoId={video.id} 
                            title={video.title} 
                            key={video.id} 
                        />
                    ); 
                })}
                {/* <VideoItem videoId="https://www.youtube.com/embed/WV6u_6ZNWkQ" /> */}
            </React.Fragment>
        );
    }

    return <Paper className={styles.root}>{content}</Paper>;
};

export default VideoContainer;
