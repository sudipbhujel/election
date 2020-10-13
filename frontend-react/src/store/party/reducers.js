import {
  LOAD_PARTIES,
  LOAD_PARTIES_SUCCESS,
  LOAD_PARTIES_ERROR,
} from "./actions";

let initState = {
  loading: true,
  data: [],
  error: void 0,
};

export const partiesReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_PARTIES:
      return { ...state, error: "" };
    case LOAD_PARTIES_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case LOAD_PARTIES_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
