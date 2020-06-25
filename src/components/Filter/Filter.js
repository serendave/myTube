import React, { useState } from "react";
import { IconButton, Menu, Typography, MenuItem, FormControl, Select } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TuneIcon from "@material-ui/icons/Tune";

const useStyles = makeStyles((theme) => ({
    menuList: {
        minWidth: 450,
        display: "flex",
        position: "relative",
        "&:focus": {
            outline: "none",
            border: "none",
        },
    },
    menuSection: {
        padding: theme.spacing(2),
        flex: 1,
    },
    closeIcon: {
        position: "absolute",
        top: 5,
        right: 5,
    },
}));

const CustomMenu = withStyles({
    paper: {
        border: "none",
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));

const Filter = (props) => {
    const [anchorElement, setAnchorElement] = useState(null);
    const styles = useStyles();

    const { orderChanged, durationChanged, qualityChanged } = props;

    const filterOpenHandler = (event) => {
        setAnchorElement(event.currentTarget);
    };

    const filterCloseHandler = () => {
        setAnchorElement(null);
    };

    return (
        <div>
            <IconButton aria-controls="filter-dropdown" aria-haspopup="true" onClick={filterOpenHandler}>
                <TuneIcon />
            </IconButton>
            <CustomMenu
                id="filter-dropdown"
                anchorEl={anchorElement}
                keepMounted
                open={Boolean(anchorElement)}
                onClose={filterCloseHandler}
            >
                <div className={styles.menuList}>
                    <FormControl className={styles.menuSection}>
                        <Typography variant="h6" gutterBottom>
                            Order
                        </Typography>
                        <Select
                            value={props.order}
                            onChange={(e) => orderChanged(e.target.value)}
                            color="primary"
                        >
                            <MenuItem value="date">Date</MenuItem>
                            <MenuItem value="rating">Rating</MenuItem>
                            <MenuItem value="relevance">Relevance</MenuItem>
                            <MenuItem value="title">Title</MenuItem>
                            <MenuItem value="views">Views</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={styles.menuSection}>
                        <Typography variant="h6" gutterBottom>
                            Duration
                        </Typography>
                        <RadioGroup
                            aria-label="duration"
                            value={props.duration}
                            onChange={(e) => durationChanged(e.target.value)}
                        >
                            <FormControlLabel
                                value="any"
                                control={<Radio size="small" color="primary" />}
                                label="Any"
                            />
                            <FormControlLabel
                                value="short"
                                control={<Radio size="small" color="primary" />}
                                label="Short"
                            />
                            <FormControlLabel
                                value="medium"
                                control={<Radio size="small" color="primary" />}
                                label="Medium"
                            />
                            <FormControlLabel
                                value="long"
                                control={<Radio size="small" color="primary" />}
                                label="Long"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl className={styles.menuSection}>
                        <Typography variant="h6" gutterBottom>
                            Quality
                        </Typography>
                        <RadioGroup
                            aria-label="quality"
                            value={props.quality}
                            onChange={(e) => qualityChanged(e.target.value)}
                        >
                            <FormControlLabel
                                value="any"
                                control={<Radio size="small" color="primary" />}
                                label="Any"
                            />
                            <FormControlLabel
                                value="standard"
                                control={<Radio size="small" color="primary" />}
                                label="SD"
                            />
                            <FormControlLabel
                                value="high"
                                control={<Radio size="small" color="primary" />}
                                label="HD"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </CustomMenu>
        </div>
    );
};

export default Filter;
