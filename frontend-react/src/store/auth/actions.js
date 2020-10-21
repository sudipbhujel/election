export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const requestLoginAction = (creds) => ({
    type: LOGIN_REQUEST,
    payload: creds,
});

export const requestLogoutAction = () => ({
    type: LOGOUT_REQUEST
})
