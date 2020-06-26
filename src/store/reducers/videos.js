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
 * collections: {
 *     :collectionId: {
 *         name: collectionName,
 *         videos: {
 *             videoId: title
 *             videoId: title
 *         }
 *     }
 * }
 *
 */

const filterCollection = (collection, id) => {
    return Object.keys(collection).reduce((object, videoId) => {
        if (videoId !== id) {
            object[videoId] = collection[videoId];
        }
        return object;
    }, {});
};

const addVideoToCollection = (state, videoId, videoTitle, collectionType, collectionId) => {
    let newState = { ...state };

    switch (collectionType) {
        case "favorites":
        case "liked":
            newState = {
                ...state,
                [collectionType]: {
                    ...state[collectionType],
                    [videoId]: videoTitle,
                },
            };
            break;
        case "custom":
            newState = {
                ...state,
                collections: {
                    ...state.collections,
                    [collectionId]: {
                        ...state.collections[collectionId],
                        videos: {
                            ...state.collections[collectionId].videos,
                            [videoId]: videoTitle
                        }
                    },
                },
            };
            break;
        default:
            break;
    }

    return newState;
};

const removeVideoFromCollection = (state, videoId, collectionType, collectionId) => {
    let newState = { ...state };
    let filteredCollection;

    switch (collectionType) {
        case "favorites":
        case "liked":
            filteredCollection = filterCollection(state[collectionType], videoId);
            newState = {
                ...state,
                [collectionType]: filteredCollection,
            };
            break;
        case "custom":
            filteredCollection = filteredCollection(state.collections[collectionId].videos, videoId);

            newState = {
                ...state,
                collections: {
                    ...state.collections,
                    [collectionId]: {
                        ...state.collections[collectionId],
                        videos: filteredCollection
                    }
                }
            };
            break;
        default:
            break;
    }

    return newState;
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
        collections: filteredCollections,
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
            return addVideoToCollection(state, action.videoId, action.videoTitle, "favorites");
        case actions.VIDEOS_FAVORITES_REMOVE:
            return removeVideoFromCollection(state, action.videoId, "favorites");
        case actions.VIDEOS_LIKED_ADD:
            return addVideoToCollection(state, action.videoId, action.videoTitle, "liked");
        case actions.VIDEOS_LIKED_REMOVE:
            return removeVideoFromCollection(state, action.videoId, "liked");
        case actions.VIDEOS_COLLECTION_CREATE:
            return createCollection(state, action.collectionName);
        case actions.VIDEOS_COLLECTION_DELETE:
            return deleteCollection(state, action.collectionId);
        case actions.VIDEOS_COLLECTION_ADD:
            return addVideoToCollection(state, action.videoId, action.videoTitle, "custom", action.collectionId);
        case actions.VIDEOS_COLLECTION_DELETE:
            return removeVideoFromCollection(state, action.videoId, "custom", action.collectionId);
        default:
            return state;
    }
};

export default reducer;
