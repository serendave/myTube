import React, { useState, useEffect } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import VideoContainer from "../../components/Video/VideoContainer/VideoContainer";

import axios from "axios";
import videosUrl from "../../config/videosAPI/videosAPI";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [videos, setVideos] = useState([]);
    const [videosLoading, setVideosLoading] = useState(false);

    useEffect(() => {
        console.log(videos);
    }, [videos]);

    const clearSearchQuery = () => {
        setSearchQuery("");
    }

    const startSearch = () => {
        setVideosLoading(true);
        setVideos([]);
    };

    const finishSearch = (videos) => {
        setVideos(videos);
        setVideosLoading(false);
    };

    const searchVideosHandler = () => {
        startSearch();

        axios.get(videosUrl, {
                params: {
                    q: searchQuery,
                    maxResults: 10,
                },
            })
            .then((response) => {
                const videosArray = response.data.items;
                const formattedVideos = [];

                videosArray.forEach((video) => {
                    formattedVideos.push({
                        id: video.id.videoId,
                        title: video.snippet.title,
                    });
                });

                finishSearch(formattedVideos);
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
                searchCleared={clearSearchQuery}
            />
            <VideoContainer videos={videos} loading={videosLoading} />
        </div>
    );
};

export default Home;
