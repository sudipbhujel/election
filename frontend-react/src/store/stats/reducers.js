import { LOAD_STATS, LOAD_STATS_SUCCESS, LOAD_STATS_ERROR } from "./actions";

let initState = {
  loading: false,
  data: [],
  error: void 0,
};

export const statsReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_STATS:
      return { ...state, loading: true, error: "" };
    case LOAD_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case LOAD_STATS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
