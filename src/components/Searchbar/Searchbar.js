import React from "react";
import { makeStyles, Paper, InputBase, IconButton, Divider } from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
    root: {
        display: "flex",
        margin: "3rem auto",
        width: "100%",
        borderRadius: 30,
    },
    input: {
        flexGrow: 1,
        padding: "10px 20px",
        backgroundColor: "#384f66",
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    box: {
        padding: 5,
    },
    divider: {
        height: 50,
        margin: 4,
    },
});

const Searchbar = (props) => {
    const styles = useStyles();

    return (
        <Paper className={styles.root}>
            <InputBase
                placeholder="Search for Videos"
                inputProps={{ "aria-label": "search for videos" }}
                className={styles.input}
                value={props.searchValue}
                onChange={(e) => props.searchValueChanged(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        props.searchClicked();
                    }
                }}
            />
            <div className={styles.box}>
                <IconButton>
                    <TuneIcon />
                </IconButton>
            </div>
            <Divider className={styles.divider} orientation="vertical" />
            <div className={styles.box}>
                <IconButton onClick={props.searchClicked}>
                    <SearchIcon />
                </IconButton>
            </div>
        </Paper>
    );
};

export default Searchbar;
