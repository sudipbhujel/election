import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './actions';

let initState = {
    loading: false,
    token: localStorage.getItem('access_token'),
    data: [],
    isAuthenticated: null,
    error: void 0,
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                error: ''
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                data: action.payload
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                token: null,
                isAuthenticated: false,
                error: action.payload
            };
        default:
            return state;
    }
};