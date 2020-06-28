import React, { Fragment } from "react";
import { Paper, makeStyles, Typography, Divider } from "@material-ui/core";
import VideoItem from "../VideoItem/VideoItem";
import Spinner from "../../UI/Spinner/Spinner";

const useStyles = makeStyles({
    root: {
        padding: 15,
        minHeight: (props) => props.minHeight ?? 350,
        position: "relative",
        backgroundColor: "#384f66",
        marginBottom: "3rem",
    },
    videosContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        alignItems: "start",
        gridGap: 15,
    },
    message: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    gutter: {
        marginBottom: 20,
    },
    heading: {
        textTransform: "capitalize",
    },
});

const VideoContainer = (props) => {
    const { videos, loading, videosType, collectionType, collectionTitle } = props;
    const styles = useStyles(props);

    let message = null;
    let heading = null;

    if (videosType === "search") {
        message = "Type something in the search bar to see the results";
        heading = <Typography variant="h4">Search Results</Typography>;
    } else if (videosType === "collection") {
        message = "There is no videos in the collection yet";
    }

    switch (collectionType) {
        case "favorites":
            heading = <Typography variant="h4">Favorite videos</Typography>;
            break;
        case "liked":
            heading = <Typography variant="h4">Liked videos</Typography>;
            break;
        case "custom":
            heading = (
                <Typography variant="h4" className={styles.heading}>
                    {collectionTitle}
                </Typography>
            );
            break;
        default:
            break;
    }

    let content = (
        <Typography variant="h5" align="center" className={styles.message}>
            {message}
        </Typography>
    );

    if (loading) {
        content = <Spinner color="primary" size="100px" centered="true" />;
    }

    if (videos.length > 0) {
        content = (
            <Fragment>
                {heading}
                <Divider className={styles.gutter} />
                <div className={styles.videosContainer}>
                    {videos.map((video) => {
                        return <VideoItem videoId={video.id} title={video.title} key={video.id} />;
                    })}
                </div>
            </Fragment>
        );
    }

    return <Paper className={styles.root}>{content}</Paper>;
};

export default VideoContainer;
