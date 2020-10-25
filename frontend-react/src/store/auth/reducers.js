import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_NO_NEED,
  REFRESH_TOKEN_FAILURE,
} from "./actions";

let initState = {
  loading: false,
  data: [],
  isAuthenticated: false,
  error: void 0,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        isAuthenticated: false,
        error: "",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        data: action.payload,
        error: "",
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        data: [],
        error: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
        error: "",
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        data: [],
      };

    case REFRESH_TOKEN_REQUEST:
      return Object.assign({}, { isAuthenticated: false, data: [] }, state, {
        loading: true,
      });
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        data: action.payload,
        error: "",
      };
    case REFRESH_TOKEN_NO_NEED:
      return { ...state, };
    case REFRESH_TOKEN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        data: [],
        loading: false,
        error: action.payload
      });

    default:
      return state;
  }
};
