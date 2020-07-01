import React, { useState, useReducer, useEffect } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import VideoContainer from "../../components/Video/VideoContainer/VideoContainer";
import Modal from "../../components/UI/Modal/Modal";

// http
import axios from "axios";
import videosUrl from "../../config/videosAPI/videosAPI";
import { makeStyles } from "@material-ui/core/styles";

const filtersReducer = (filters, action) => {
    switch (action.type) {
        case "SET_ORDER":
            return {
                ...filters,
                order: action.order,
            };
        case "SET_DURATION":
            return {
                ...filters,
                duration: action.duration,
            };
        case "SET_QUALITY":
            return {
                ...filters,
                quality: action.quality,
            };
        case "SET_MAX_RESULTS":
            return {
                ...filters,
                maxResults: parseInt(action.maxResults),
            };
        default:
            return filters;
    }
};

const useStyles = makeStyles({
    root: {
        width: "95%",
        margin: "0 auto",
    },
});

const Home = (props) => {
    const styles = useStyles(props);

    // useState
    const [searchQuery, setSearchQuery] = useState("");

    const [videos, setVideos] = useState([]);
    const [videosLoading, setVideosLoading] = useState(false);
    const [error, setError] = useState(null);

    const [prevPage, setPrevPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [prevPageToken, setPrevPageToken] = useState(null);
    const [nextPageToken, setNextPageToken] = useState(null);

    // useReducer
    const [filters, dispatch] = useReducer(filtersReducer, {
        order: "relevance",
        duration: "any",
        quality: "any",
        maxResults: 6,
    });

    // Redux
    const clearSearchHandler = () => setSearchQuery("");
    const setOrderHandler = (order) => dispatch({ type: "SET_ORDER", order });
    const setDurationHandler = (duration) => dispatch({ type: "SET_DURATION", duration });
    const setQualityHandler = (quality) => dispatch({ type: "SET_QUALITY", quality });
    const setMaxResultsHandler = (maxResults) => dispatch({ type: "SET_MAX_RESULTS", maxResults });

    useEffect(() => {
        if (currentPage && prevPage) {
            if (currentPage > prevPage) {
                searchVideosHandler(nextPageToken);
            } else if (currentPage < prevPage) {
                searchVideosHandler(prevPageToken);
            }
        }
    }, [currentPage, prevPage]);

    const startSearchHandler = () => {
        setVideosLoading(true);
        setVideos([]);
    };

    const finishSearchHandler = (videos, prevPageToken, nextPageToken) => {
        setVideos(videos);
        setVideosLoading(false);
        setPrevPageToken(prevPageToken);
        setNextPageToken(nextPageToken);
    };

    const changePageHandler = (pageValue) => {
        setCurrentPage((prevPage) => {
            setPrevPage(prevPage);
            return pageValue;
        });
    };

    const searchVideosHandler = (currentPageToken) => {
        startSearchHandler();

        const searchParams = {
            q: searchQuery,
            videoEmbeddable: true,
            type: "video",
            order: filters.order,
            duration: filters.duration,
            quality: filters.quality,
            maxResults: filters.maxResults,
        };

        if (currentPageToken) {
            searchParams.pageToken = currentPageToken;
        }

        axios.get(videosUrl, { params: searchParams })
            .then((response) => {
                const videosArray = response.data.items;
                const formattedVideos = [];

                const prevPageToken = response.data.prevPageToken;
                const nextPageToken = response.data.nextPageToken;

                videosArray.forEach((video) => {
                    formattedVideos.push({
                        id: video.id.videoId,
                        title: video.snippet.title,
                    });
                });

                finishSearchHandler(formattedVideos, prevPageToken, nextPageToken);
            })
            .catch((error) => {
                console.log(error.response);
                setError(error.response.data.error.message);
            });
    };

    const clearErrorHandler = () => {
        setError(null);
        setVideosLoading(false);
    };

    return (
        <div className={styles.root}>
            <Searchbar
                searchValue={searchQuery}
                searchValueChanged={setSearchQuery}
                searchClicked={searchVideosHandler}
                searchCleared={clearSearchHandler}
                order={filters.order}
                orderChanged={setOrderHandler}
                duration={filters.duration}
                durationChanged={setDurationHandler}
                quality={filters.quality}
                qualityChanged={setQualityHandler}
                maxResults={filters.maxResults}
                maxResultsChanged={setMaxResultsHandler}
            />
            <VideoContainer
                videos={videos}
                loading={videosLoading}
                videosType="search"
                pageChanged={changePageHandler}
                page={currentPage}
            />
            <Modal
                title="Opps. Something went wrong during loading videos"
                message={error}
                open={Boolean(error)}
                closed={clearErrorHandler}
            />
        </div>
    );
};

export default Home;
