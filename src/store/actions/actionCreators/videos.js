import databaseUrl from "../../../config/dataAPI/dataAPI";
import * as actions from "../actions";
import axios from "axios";

export const favoritesAdd = (videoId, videoTitle) => ({
    type: actions.VIDEOS_FAVORITES_ADD,
    videoId,
    videoTitle,
});

export const favoritesRemove = (videoId) => ({
    type: actions.VIDEOS_FAVORITES_REMOVE,
    videoId,
});

export const likedAdd = (videoId, videoTitle) => ({
    type: actions.VIDEOS_LIKED_ADD,
    videoId,
    videoTitle,
});

export const likedRemove = (videoId) => ({
    type: actions.VIDEOS_LIKED_REMOVE,
    videoId,
});

export const collectionCreate = (collectionName) => ({
    type: actions.VIDEOS_COLLECTION_CREATE,
    collectionName
});

export const collectionDelete = (collectionId) => ({
    type: actions.VIDEOS_COLLECTION_DELETE,
    collectionId
});

export const collectionAdd = (collectionId, videoId, videoTitle) => ({
    type: actions.VIDEOS_COLLECTION_ADD,
    collectionId,
    videoId,
    videoTitle
});

export const collectionRemove = (collectionId, videoId) => ({
    type: actions.VIDEOS_COLLECTION_REMOVE,
    collectionId,
    videoId
});

export const collectionsClear = () => ({
    type: actions.VIDEOS_CLEAR_COLLECTIONS
});

export const selectVideo = (videoTitle) => ({
    type: actions.VIDEOS_ADD_SELECTED_VIDEO,
    videoTitle
});

const fetchCollecionsStart = () => ({
    type: actions.VIDEOS_FETCH_START,
});

const fetchCollecionsSuccess = (videos) => ({
    type: actions.VIDEOS_FETCH_SUCCESS,
    videos,
});

const fetchCollecionsFail = (error) => ({
    type: actions.VIDEOS_FETCH_FAIL,
    error,
});

export const fetchCollections = (token, userId) => {
    return (dispatch) => {
        // Start fetching videos
        dispatch(fetchCollecionsStart());

        const url = `${databaseUrl}/users/${userId}.json?auth=${token}`;

        // Fetching the results
        axios.get(url)
            .then((videos) => {
                dispatch(fetchCollecionsSuccess(videos.data));
            })
            .catch((error) => {
                dispatch(fetchCollecionsFail(error.message));
            });
    };
};