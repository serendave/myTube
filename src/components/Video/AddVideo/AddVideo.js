import React, { useState, useEffect } from "react";

import * as actions from "../../../store/actions/actionCreators/videos";
import { useSelector, useDispatch } from "react-redux";

import Menu from "@material-ui/core/Menu";
import {
    Button,
    makeStyles,
    Typography,
    FormControl,
    FormControlLabel,
    Checkbox,
    Divider,
} from "@material-ui/core";

const useStyles = makeStyles({
    menu: {
        "& ul": {
            padding: 15,
            display: "flex",
            flexDirection: "column",
        },
    },
    divider: {
        marginBottom: 10,
    },
    button: {
        alignSelf: "flex-end",
    },
});

const AddVideo = (props) => {
    const styles = useStyles();
    const { videoId, title, anchorEl, closeMenuHandler } = props;

    const [collections, setCollections] = useState(null);
    const stateCollections = useSelector((state) => state.videos.collections);
    const dispatch = useDispatch();
    const onAddVideoToCollection = (collectionId, videoId, videoTitle) =>
        dispatch(actions.collectionAdd(collectionId, videoId, videoTitle));
    const onRemoveVideoFromCollection = (collectionId, videoId) =>
        dispatch(actions.collectionRemove(collectionId, videoId));

    useEffect(() => {
        const formattedCollections = {};

        for (let collectionId in stateCollections) {
            let videoAdded = false;
            for (let id in stateCollections[collectionId].videos) {
                if (videoId === id) {
                    videoAdded = true;
                    break;
                }
            }
            formattedCollections[collectionId] = {
                name: stateCollections[collectionId].name,
                videoAdded,
            };
        }

        setCollections(formattedCollections);
    }, [stateCollections, videoId]);

    const toggleVideoPresenceHandler = (collectionId) => {
        setCollections((previousCollections) => {
            return {
                ...previousCollections,
                [collectionId]: {
                    ...previousCollections[collectionId],
                    videoAdded: !previousCollections[collectionId].videoAdded,
                },
            };
        });
    };

    const manageCollectionsHandler = () => {
        for (let collectionId in collections) {
            if (collections[collectionId].videoAdded) {
                onAddVideoToCollection(collectionId, videoId, title);
            } else {
                onRemoveVideoFromCollection(collectionId, videoId);
            }
        }
    }
    
    let content = <Typography variant="subtitle1">There is no collections created yet</Typography>;

    if (collections && Object.keys(collections).length > 0) {
        let displayCollections = [];

        for (let collectionId in collections) {
            displayCollections.push(
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            checked={collections[collectionId].videoAdded}
                            onChange={() => toggleVideoPresenceHandler(collectionId)}
                        />
                    }
                    label={collections[collectionId].name}
                    key={collectionId}
                />
            );
        }

        content = (
            <div>
                <Typography variant="subtitle1">Add to collection:</Typography>
                <Divider />
                <FormControl row="true">{displayCollections}</FormControl>
                <Divider className={styles.divider} />
                <Button
                    color="primary"
                    variant="contained"
                    className={styles.button}
                    onClick={manageCollectionsHandler}
                >
                    Save
                </Button>
            </div>
        );
    }

    return (
        <Menu
            id="add-video"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMenuHandler}
            className={styles.menu}
            elevation={5}
        >
            {content}
        </Menu>
    );
};

export default AddVideo;
