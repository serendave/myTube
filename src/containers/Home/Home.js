import React, { useState, useReducer } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import VideoContainer from "../../components/Video/VideoContainer/VideoContainer";

// http
import axios from "axios";
import videosUrl from "../../config/videosAPI/videosAPI";

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
        default:
            return filters;
    }
};

const Home = () => {
    // useState
    const [searchQuery, setSearchQuery] = useState("");
    const [videos, setVideos] = useState([]);
    const [videosLoading, setVideosLoading] = useState(false);

    // useReducer
    const [filters, dispatch] = useReducer(filtersReducer, {
        order: "relevance",
        duration: "any",
        quality: "any",
    });

    const clearSearchHandler = () => setSearchQuery("");
    const setOrderHandler = (order) => dispatch({ type: "SET_ORDER", order });
    const setDurationHandler = (duration) => dispatch({ type: "SET_DURATION", duration });
    const setQualityHandler = (quality) => dispatch({ type: "SET_QUALITY", quality });

    const startSearchHanlder = () => {
        setVideosLoading(true);
        setVideos([]);
    };

    const finishSearchHandler = (videos) => {
        setVideos(videos);
        setVideosLoading(false);
    };

    const searchVideosHandler = () => {
        startSearchHanlder();

        const searchParams = {
            q: searchQuery,
            maxResults: 10,
            videoEmbeddable: true,
            type: "video",
            order: filters.order,
            duration: filters.duration,
            quality: filters.quality
        };

        axios.get(videosUrl, { params: searchParams })
            .then((response) => {
                const videosArray = response.data.items;
                const formattedVideos = [];

                videosArray.forEach((video) => {
                    formattedVideos.push({
                        id: video.id.videoId,
                        title: video.snippet.title,
                    });
                });

                finishSearchHandler(formattedVideos);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
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
            />
            <VideoContainer videos={videos} loading={videosLoading} videosType="search" />
        </div>
    );
};

export default Home;
