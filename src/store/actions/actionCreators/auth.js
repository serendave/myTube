import * as actions from "../actions";
import { signUpUrl, signInUrl, userInfoUrl } from "../../../config/authAPI/authAPI";
import axios from "axios";

export const authStart = () => ({
    type: actions.AUTH_START,
});

export const authSuccess = (token, userId, userEmail) => ({
    type: actions.AUTH_SUCCESS,
    token,
    userId,
    userEmail,
});

export const authFail = (error) => ({
    type: actions.AUTH_FAIL,
    error,
});

export const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    return {
        type: actions.AUTH_LOGOUT,
    };
};

export const authenticate = (email, password, isSignedUp) => {
    return async (dispatch) => {
        dispatch(authStart());

        try {
            let url = isSignedUp ? signInUrl : signUpUrl;
            const authData = {
                email,
                password,
                returnSecureToken: true,
            };

            const response = await axios.post(url, authData);

            const token = response.data.idToken;
            const userId = response.data.localId;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);

            dispatch(authSuccess(token, userId, email));
        } catch (error) {
            console.log(error.message);
            dispatch(authFail());
        }
    };
};

export const authCheckState = () => {
    return async (dispatch) => {
        dispatch(authStart());

        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logOut());
        } else {
            try {
                const userId = localStorage.getItem("userId");
                const response = await axios.post(userInfoUrl, { idToken: token });

                const email = response.data.users[0].email;

                dispatch(authSuccess(token, userId, email));
            } catch (error) {
                console.log(error);
                dispatch(logOut());
            }
        }
    };
};

/*

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())));
            } else {
                dispatch(logOut());
            }
        }
    };
};

*/
