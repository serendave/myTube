import * as actions from "../actions/actions";
import { v4 as createUniqueId } from "uuid";

const initialState = {
    favorites: null,
    liked: null,
    collections: null,
    loading: false,
    error: null,
};

/**
 * STATE:
 *
 * favorites: {
 *     videoId: title
 *     videoId: title
 *     videoId: title
 * }
 *
 * liked: {
 *     videoId: title
 *     videoId: title
 *     videoId: title
 * }
 *
 * collections..
 *
 */

const addVideoToCollection = (state, collection, videoId, videoTitle) => {
    return {
        ...state,
        [collection]: {
            ...state[collection],
            [videoId]: videoTitle,
        },
    };
};

const removeVideoFromCollection = (state, collection, id) => {
    const filteredCollection = Object.keys(state[collection]).reduce((object, videoId) => {
        if (videoId !== id) {
            object[videoId] = state[collection][videoId];
        }
        return object;
    }, {});

    return {
        ...state,
        [collection]: filteredCollection,
    };
};

const createCollection = (state, collectionName) => {
    const collectionId = createUniqueId();

    return {
        ...state,
        collections: {
            ...state.collections,
            [collectionId]: {
                name: collectionName,
                videos: null,
            },
        },
    };
};

const deleteCollection = (state, id) => {
    const filteredCollections = Object.keys(state.collections).reduce((collectionsObj, collectionId) => {
        if (collectionId !== id) {
            collectionsObj[collectionId] = state.collections[collectionId];
        }

        return collectionsObj;
    });

    return {
        ...state,
        collections: filteredCollections
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.VIDEOS_FETCH_START:
            return { ...state, loading: true };
        case actions.VIDEOS_FETCH_SUCCESS:
            return { ...state, ...action.videos, loading: false };
        case actions.VIDEOS_FETCH_FAIL:
            return { ...state, loading: false, error: action.error };
        case actions.VIDEOS_FAVORITES_ADD:
            return addVideoToCollection(state, "favorites", action.videoId, action.videoTitle);
        case actions.VIDEOS_FAVORITES_REMOVE:
            return removeVideoFromCollection(state, "favorites", action.videoId);
        case actions.VIDEOS_LIKED_ADD:
            return addVideoToCollection(state, "liked", action.videoId, action.videoTitle);
        case actions.VIDEOS_LIKED_REMOVE:
            return removeVideoFromCollection(state, "liked", action.videoId);
        case actions.VIDEOS_COLLECTION_CREATE:
            return createCollection(state, action.collectionName);
        case actions.VIDEOS_COLLECTION_DELETE:
            return deleteCollection(state, action.collectionId);
        default:
            return state;
    }
};

export default reducer;
