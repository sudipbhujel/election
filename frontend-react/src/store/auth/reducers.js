import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
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
      return { ...state, loading: true };
    case REFRESH_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: true,
        data: action.payload,
        error: "",
      });
    case REFRESH_TOKEN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        data: [],
        loading: false,
        error: "",
      });

    default:
      return state;
  }
};

let initRegister = {
  loading: false,
  data: [],
  error: void 0,
};

export const registerReducer = (state = initRegister, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        error: "",
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
