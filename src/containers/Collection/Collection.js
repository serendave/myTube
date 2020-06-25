import React, { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

import VideoContainer from "../../components/Video/VideoContainer/VideoContainer";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        padding: 25,
    },
});

const Collection = (props) => {
    const { type } = props;
    const styles = useStyles();

    const formatVideos = (collection, resultArray) => {
        for (let videoId in collection) {
            resultArray.push({
                id: videoId,
                title: collection[videoId],
            });
        }
    };

    const videos = useSelector((state) => {
        const formattedVideos = [];

        switch (type) {
            case "favorites":
                formatVideos(state.videos.favorites, formattedVideos);
                break;
            case "liked":
                formatVideos(state.videos.liked, formattedVideos);
            default:
                break;
        }

        return formattedVideos;
    });

    return (
        <div className={styles.root}>
            <VideoContainer videos={videos} videosType="collection" minHeight="500px" collectionType={type} />
        </div>
    );
};

export default Collection;
