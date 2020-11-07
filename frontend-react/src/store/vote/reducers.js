import {
  REQUEST_BALLOT,
  REQUEST_BALLOT_SUCCESS,
  REQUEST_BALLOT_ERROR,
  DO_VOTE_REQUEST,
  DO_VOTE_SUCCESS,
  DO_VOTE_ERROR,
} from "./actions";

let initState = {
  loading: false,
  data: [],
  error: void 0,
};

export const voteReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_BALLOT:
      return { ...state, loading: true, error: "" };
    case REQUEST_BALLOT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case REQUEST_BALLOT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DO_VOTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DO_VOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case DO_VOTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
