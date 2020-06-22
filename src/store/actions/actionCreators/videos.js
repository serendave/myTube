import * as actions from '../actions';

export const favoritesAdd = (videoId, videoTitle) => {
    return {
        type: actions.VIDEOS_FAVORITES_ADD,
        videoId,
        videoTitle
    };
};

export const favoritesRemove = (videoId) => {
    return {
        type: actions.VIDEOS_FAVORITES_REMOVE,
        videoId
    };
};

export const likedAdd = (videoId, videoTitle) => {
    return {
        type: actions.VIDEOS_LIKED_ADD,
        videoId,
        videoTitle
    };
};

export const likedRemove = (videoId) => {
    return {
        type: actions.VIDEOS_LIKED_REMOVE,
        videoId
    };
};