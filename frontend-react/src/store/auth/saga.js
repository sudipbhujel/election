import {
  put,
  takeEvery,
  takeLatest,
  call,
  all,
  select,
} from "redux-saga/effects";
import jwt_decode from "jwt-decode";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_NO_NEED,
} from "./actions";
import { addAuthTokenApi, refreshTokenApi } from "./api";

import { loadState, saveState } from "../../services/localStorage"
import { deltaTime } from "../../services/tokenHandlers"

export function* addingAuthTokenAsync({ payload }) {
  try {
    console.log(payload)
    const data = yield call(addAuthTokenApi, payload);
    // if (data && data.access && data.refresh) {
    //     console.log(jwt_decode(data.access));
    //     localStorage.setItem('access_token', data.access);
    //     localStorage.setItem('refresh_token', data.refresh);
    // }
    const { access, refresh } = data;
    // console.log(jwt_decode(access))
    // console.log(jwt_decode(refresh))

    yield put({ type: LOGIN_SUCCESS, payload: { access, refresh } });
  } catch (err) {
    // console.log(err.message);
    yield put({ type: LOGIN_FAILURE, payload: err.message });
  }
}

export function* watchAddingAuthTokenAsync() {
  yield takeLatest(LOGIN_REQUEST, addingAuthTokenAsync);
}

export function* removingAuthTokenAsync() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  yield put({ type: LOGOUT_SUCCESS });
}

export function* watchRemovingAuthTokenAsync() {
  yield takeEvery(LOGOUT_REQUEST, removingAuthTokenAsync);
}

export function* refreshingTokenAsync(action) {
  const data = loadState().auth.data


    const state = yield select();

    // console.log("state is", state);
    // console.log(deltaTime(state.auth.data.access));
    // console.log(deltaTime(state.auth.data.refresh));

    const refreshToken = data.refresh;
    const accessToken = data.access;

    console.log("refresh token is", state.auth.data.refresh);
    if (
      typeof refreshToken === "undefined" ||
      typeof accessToken === "undefined"
    ) {
      console.log("Undefined refresh and access")
      yield put({ type: REFRESH_TOKEN_FAILURE, payload: "Undefined refresh or access token." });
    }
    
    const deltaRefresh = yield call(deltaTime, refreshToken)

    console.log(deltaRefresh)

    if (deltaRefresh > 0) {
        // Valid refresh token
        const deltaAccess = yield call(deltaTime, accessToken)

        if (deltaAccess < 0) {
            // Access token expires
            const {access} = yield call(refreshTokenApi, refreshToken)

            // const refresh = state.auth.data.refresh

            // saveState({auth: state.auth})

            yield put({ type: REFRESH_TOKEN_SUCCESS, payload: { access, refresh: refreshToken } });
        } else {
            // Access token doesn't expire
            console.log("Good to go Access Token")
            yield put({ type: REFRESH_TOKEN_NO_NEED });
        }

    } else {
        // Redirect to login (Refresh token is Expired)
        console.log("Refresh token expires!")
    }
}

export function* watchRefreshingTokenAsync() {
  yield takeLatest(REFRESH_TOKEN_REQUEST, refreshingTokenAsync);
}

export function* authSaga() {
  // yield* watchRefreshingTokenAsync();

  yield all([
    // watchRefreshingTokenAsync(),
    watchAddingAuthTokenAsync(),
    watchRemovingAuthTokenAsync(),
    // watchRefreshingTokenAsync(),
  ]);
}

// exp: 1603280251
// jti: "1ffe5ca97264403db05882e295c0cb7b"
// token_type: "access"
// user_id: "15f6e4c8-7e1b-47f4-a444-976432001db3"
