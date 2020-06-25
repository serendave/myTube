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
                console.log(videos);

                dispatch(fetchCollecionsSuccess(videos.data));
            })
            .catch((error) => {
                console.log(error);

                dispatch(fetchCollecionsFail(error.message));
            });
    };
};

/*

export const fetchOrders = (token, userId) => {
    return dispatch => {
        // Start fetching the orders to load the spinner
        dispatch(fetchOrdersStart());
        
        // After fetching the orders show load them

        // Query param auth to require a token
        // orderBy is a param understood by firebase
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

        axios.get("/orders.json" + queryParams)
            .then(orders => {
                const fetchedOrders = [];
                for (let key in orders.data) {
                    fetchedOrders.push({
                        ...orders.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error));
            });
    };
};

*/
