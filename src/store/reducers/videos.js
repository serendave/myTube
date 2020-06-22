import * as actions from "../actions/actions";

const initialState = {
    favorites: null,
    liked: null,
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

const addVideoToCollection = (state, collection, video) => {
    return {
        ...state,
        [collection]: {
            ...state[collection],
            [video.id]: video.title,
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.VIDEOS_FAVORITES_ADD:
            return addVideoToCollection(state, "favorites", {
                id: action.videoId,
                title: action.videoTitle,
            });
        case actions.VIDEOS_FAVORITES_REMOVE: 
            return removeVideoFromCollection(state, "favorites", action.videoId);
        case actions.VIDEOS_LIKED_ADD:
            return addVideoToCollection(state, "liked", {
                id: action.videoId,
                title: action.videoTitle
            });
        case actions.VIDEOS_LIKED_REMOVE: 
            return removeVideoFromCollection(state, "liked", action.videoId);
        default:
            return state;
    }
};

export default reducer;
