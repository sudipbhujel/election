import {
    LOAD_PROFILE,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_ERROR
} from './actions';

let initState = {
    loading: false,
    data: [],
    error: void 0,
    isAuthenticated: false,
};

export const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_PROFILE:
            return { ...state, loading: true, error: '' };
        case LOAD_PROFILE_SUCCESS:
            return { ...state, loading: false, isAuthenticated:true, data: action.payload };
        case LOAD_PROFILE_ERROR:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
