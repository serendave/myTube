import React, { useState } from "react";

import { useDispatch } from "react-redux";
import * as actions from "../../../store/actions/actionCreators/videos";

import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { InputBase, Button, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    menu: {
        "& ul": {
            padding: 10,
        }
    },
    inputBox: {
        display: "flex",
        alignItems: "center",
    },
    input: {
        marginRight: 10,
        backgroundColor: "#384f66",
        border: "none",
        padding: "5px 10px",
    },
});

const AddCollection = () => {
    const styles = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [collectionName, setCollectionName] = useState("");

    const dispatch = useDispatch();
    const onCollectionCreate = (collectionName) => dispatch(actions.collectionCreate(collectionName));
    
    const createCollectionHandler = () => {
        onCollectionCreate(collectionName);

        setCollectionName("");
    }
    
    const openMenuHandler = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenuHandler = () => {
        setAnchorEl(null);
    };

    const changeCollectionNameHandler = (value) => {
        setCollectionName(value);
    };

    return (
        <div>
            <IconButton aria-controls="add-collection" aria-haspopup="true" onClick={openMenuHandler}>
                <AddIcon />
            </IconButton>
            <Menu
                id="add-collection"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeMenuHandler}
                className={styles.menu}
                elevation={5}
            >
                <Typography variant="subtitle1" gutterBottom>
                    Enter a name of the new collection
                </Typography>
                <div className={styles.inputBox}>
                    <InputBase
                        variant="outlined"
                        size="small"
                        value={collectionName}
                        placeholder="Collection name"
                        className={styles.input}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                createCollectionHandler();
                            }
                        }}
                        onChange={(e) => changeCollectionNameHandler(e.target.value)}
                    />
                    <Button color="primary" variant="contained" onClick={createCollectionHandler}>
                        OK
                    </Button>
                </div>
            </Menu>
        </div>
    );
};

export default AddCollection;
