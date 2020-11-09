export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILURE = "REFRESH_TOKEN_FAILURE";

export const USER_ACTIVATE_REQUEST = "USER_ACTIVATE_REQUEST";
export const USER_ACTIVATE_SUCCESS = "USER_ACTIVATE_SUCCESS";
export const USER_ACTIVATE_FAILURE = "USER_ACTIVATE_FAILURE";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

export const RESET_PASSWORD_CONFIRM_REQUEST = "RESET_PASSWORD_CONFIRM_REQUEST";
export const RESET_PASSWORD_CONFIRM_SUCCESS = "RESET_PASSWORD_CONFIRM_SUCCESS";
export const RESET_PASSWORD_CONFIRM_FAILURE = "RESET_PASSWORD_CONFIRM_FAILURE";

export const RESET_PASSWORD_CONFIRM_DONE_REQUEST =
  "RESET_PASSWORD_CONFIRM_DONE_REQUEST";
export const RESET_PASSWORD_CONFIRM_DONE_SUCCESS =
  "RESET_PASSWORD_CONFIRM_DONE_SUCCESS";
export const RESET_PASSWORD_CONFIRM_DONE_FAILURE =
  "RESET_PASSWORD_CONFIRM_DONE_FAILURE";

export const PASSWORD_CHANGE_REQUEST = "PASSWORD_CHANGE_REQUEST";
export const PASSWORD_CHANGE_SUCCESS = "PASSWORD_CHANGE_SUCCESS";
export const PASSWORD_CHANGE_FAILURE = "PASSWORD_CHANGE_FAILURE";

export const requestSignUpAction = (creds) => ({
  type: SIGNUP_REQUEST,
  payload: creds,
});

export const requestLoginAction = (creds) => ({
  type: LOGIN_REQUEST,
  payload: creds,
});

export const requestLogoutAction = () => ({
  type: LOGOUT_REQUEST,
});

export const requestRefreshTokenAction = (refreshToken) => ({
  type: REFRESH_TOKEN_REQUEST,
  payload: refreshToken,
});

export const requestUserActivateAction = (creds) => ({
  type: USER_ACTIVATE_REQUEST,
  payload: creds,
});

export const requestResetPasswordAction = (creds) => ({
  type: RESET_PASSWORD_REQUEST,
  payload: creds,
});

export const requestResetPasswordConfirmAction = (creds) => ({
  type: RESET_PASSWORD_CONFIRM_REQUEST,
  payload: creds,
});

export const requestResetPasswordConfirmPostAction = (creds) => ({
  type: RESET_PASSWORD_CONFIRM_DONE_REQUEST,
  payload: creds,
});

export const requestChangePasswordAction = (creds) => ({
  type: PASSWORD_CHANGE_REQUEST,
  payload: creds,
});
