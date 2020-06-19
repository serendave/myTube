import React, { useState, useEffect } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import VideoContainer from "../../components/Video/VideoContainer/VideoContainer";

import axios from "axios";
import videosUrl from "../../config/videosAPI/videosAPI";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        console.log(videos);
    }, [videos]);

    const searchVideosHandler = () => {
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

                setVideos(formattedVideos);
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
            />
            <VideoContainer videos={videos} />
        </div>
    );
};

export default Home;
