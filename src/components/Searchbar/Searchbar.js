import React from "react";
import { makeStyles, Paper, InputBase, IconButton, Divider } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Filter from "../Filter/Filter";
import classnames from "classnames";

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
    clearIcon: {
        backgroundColor: "#384f66",
    },
    box: {
        padding: 5,
    },
    divider: {
        height: 50,
        margin: 4,
    },
});

const Searchbar = React.memo((props) => {
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
            <div className={classnames(styles.box, styles.clearIcon)}>
                <IconButton onClick={props.searchCleared}>
                    <ClearIcon />
                </IconButton>
            </div>
            <div className={styles.box}>
                <Filter
                    order={props.order}
                    orderChanged={props.orderChanged}
                    duration={props.duration}
                    durationChanged={props.durationChanged}
                    quality={props.quality}
                    qualityChanged={props.qualityChanged}
                    maxResults={props.maxResults}
                    maxResultsChanged={props.maxResultsChanged}
                />
            </div>
            <Divider className={styles.divider} orientation="vertical" />
            <div className={styles.box}>
                <IconButton onClick={props.searchClicked}>
                    <SearchIcon />
                </IconButton>
            </div>
        </Paper>
    );
});

export default Searchbar;
