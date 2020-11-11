import { LOAD_STATE, LOAD_STATE_SUCCESS, LOAD_STATE_ERROR } from "./actions";

let initState = {
  loading: false,
  data: [],
  error: void 0,
};

export const stateReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_STATE:
      return { ...state, loading: true, error: "" };
    case LOAD_STATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case LOAD_STATE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
