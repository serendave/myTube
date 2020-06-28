import React from "react";

// Redux
import { useSelector } from "react-redux";

import VideoContainer from "../../components/Video/VideoContainer/VideoContainer";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        padding: 25
    },
});

const Collection = (props) => {
    const { type } = props;
    const styles = useStyles();
    let collectionTitle = null;

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
                break;
            case "custom":
                const collectionId = props.match.params.id;
                const collection = state.videos.collections[collectionId]; 
                collectionTitle = collection.name; 

                formatVideos(collection.videos, formattedVideos);
                break;
            default:
                break;
        }

        return formattedVideos;
    });

    return (
        <div className={styles.root}>
            <VideoContainer
                videos={videos}
                videosType="collection"
                minHeight="500px"
                collectionType={type}
                collectionTitle={collectionTitle}
            />
        </div>
    );
};

export default Collection;
