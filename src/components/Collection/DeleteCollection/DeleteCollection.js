import React, { useState } from "react";

import { useDispatch } from "react-redux";
import * as actions from "../../../store/actions/actionCreators/videos";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const DeleteCollection = (props) => {
    const [open, setOpen] = useState(false);

    const { collectionId } = props;

    const dispatch = useDispatch();
    const onDeleteCollection = (collectionId) => dispatch(actions.collectionDelete(collectionId));

    const openDialogHandler = () => {
        setOpen(true);
    };

    const closeDialogHandler = () => {
        setOpen(false);
    };

    const deleteCollectionHandler = () => {
        onDeleteCollection(collectionId);
    };

    return (
        <div>
            <IconButton
                size="small"
                edge="end"
                aria-label="delete collection"
                onClick={(e) => {
                    e.preventDefault();
                    openDialogHandler();
                }}
            >
                <CloseIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={closeDialogHandler}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Are you sure you want to delete collection?</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeDialogHandler();
                        }}
                        color="primary"
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteCollectionHandler();
                            closeDialogHandler();
                        }}
                        color="primary"
                        autoFocus
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteCollection;
