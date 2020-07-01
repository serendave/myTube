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