import React, { useState, useEffect } from "react";

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
import { useSelector } from "react-redux";

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
    const { videoId, anchorEl, closeMenuHandler } = props;

    const [collections, setCollections] = useState(null);
    const stateCollections = useSelector((state) => state.videos.collections);

    useEffect(() => {
        const formattedCollections = {};

        for (let collectionId in stateCollections) {
            let videoPresentInCollection = false;
            for (let id in stateCollections[collectionId].videos) {
                if (videoId === id) {
                    videoPresentInCollection = true;
                    break;
                }
            }
            formattedCollections[collectionId] = {
                name: stateCollections[collectionId].name,
                videoPresentInCollection,
            };
        }

        setCollections(formattedCollections);
    }, []);

    useEffect(() => {
        console.log(collections);
    }, [collections]);

    const toggleVideoPresenceHandler = (collectionId) => {
        setCollections((previousCollections) => {
            return {
                ...previousCollections,
                [collectionId]: {
                    ...previousCollections[collectionId],
                    videoPresentInCollection: !previousCollections[collectionId].videoPresentInCollection,
                },
            };
        });
    };

    const addVideoToCollectionHandler = () => {
        // useDispatch
    };

    let content = <Typography variant="subtitle1">There is no collections created yet</Typography>;

    if (collections && Object.keys(collections).length > 0) {
        let displayCollections = [];

        for (let collectionId in collections) {
            displayCollections.push(
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            checked={collections[collectionId].videoPresentInCollection}
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
                    onClick={addVideoToCollectionHandler}
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
