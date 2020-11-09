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
  USER_ACTIVATE_REQUEST,
  USER_ACTIVATE_SUCCESS,
  USER_ACTIVATE_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_CONFIRM_REQUEST,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAILURE,
  RESET_PASSWORD_CONFIRM_DONE_REQUEST,
  RESET_PASSWORD_CONFIRM_DONE_SUCCESS,
  RESET_PASSWORD_CONFIRM_DONE_FAILURE,
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

let initActivate = {
  loading: false,
  data: [],
  error: void 0,
};

export const activateReducer = (state = initActivate, action) => {
  switch (action.type) {
    case USER_ACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        error: "",
      };
    case USER_ACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case USER_ACTIVATE_FAILURE:
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

let initReset = {
  loading: false,
  data: [],
  error: void 0,
};

export const resetReducer = (state = initActivate, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        error: "",
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case RESET_PASSWORD_CONFIRM_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        error: "",
      };
    case RESET_PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        data: action.payload,
        error: "",
      };
    case RESET_PASSWORD_CONFIRM_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case RESET_PASSWORD_CONFIRM_DONE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        data: [],
        error: "",
      };
    case RESET_PASSWORD_CONFIRM_DONE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    case RESET_PASSWORD_CONFIRM_DONE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
