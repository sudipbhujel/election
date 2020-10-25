export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_NO_NEED = 'REFRESH_TOKEN_NO_NEED';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

export const requestLoginAction = (creds) => ({
    type: LOGIN_REQUEST,
    payload: creds,
});

export const requestLogoutAction = () => ({
    type: LOGOUT_REQUEST
})

export const requestRefreshTokenAction = (refreshToken) => ({
    type: REFRESH_TOKEN_REQUEST,
    payload: refreshToken
})