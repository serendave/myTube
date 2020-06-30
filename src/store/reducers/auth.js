import * as actions from '../actions/actions';

const initialState = {
    token: null,
    userId: null,
    error: null,
    userEmail: null,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                userEmail: action.userEmail,
                error: null,
                loading: false,
            };
        case actions.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case actions.AUTH_LOGOUT: {
            return {
                ...state,
                token: null,
                userId: null,
                loading: false,
            };
        }
        case actions.AUTH_CLEAR_ERROR: {
            return {
                ...state,
                error: null
            }
        }
        default:
            return state;
    }
};

export default reducer;

/*
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}; 

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogOut = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogOut(state, action);
        case actionTypes.SET_AUTH_REDIRECT: return setAuthRedirectPath(state, action);
        default: 
            return state;
    }
};

export default reducer;


*/
