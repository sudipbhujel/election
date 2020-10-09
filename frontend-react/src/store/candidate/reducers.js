import {
    LOAD_CANDIDATE,
    LOAD_CANDIDATE_SUCCESS,
    LOAD_CANDIDATE_ERROR
} from './actions';

let initState = {
    loading: false,
    data: [],
    error: void 0,
};

export const candidatesReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_CANDIDATE:
            return { ...state, loading: true, error: '' };
        case LOAD_CANDIDATE_SUCCESS:
            return { ...state, loading: false, data: [...action.payload] };
        case LOAD_CANDIDATE_ERROR:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
