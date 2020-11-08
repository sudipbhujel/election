import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects";
import jwt_decode from "jwt-decode";

import { displayMessageAction } from "../toast/actions";

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
import { addAuthTokenApi, addNewUserApi } from "./api";

export function* addingNewUserAsync({ payload }) {
  try {
    const data = yield call(addNewUserApi, payload);
    yield put({
      type: SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    yield put({ type: SIGNUP_FAILURE, payload: err });
  }
}

export function* watchAddingNewUserAsync() {
  yield takeLatest(SIGNUP_REQUEST, addingNewUserAsync);
}

export function* addingAuthTokenAsync({ payload }) {
  try {
    const data = yield call(addAuthTokenApi, payload);
    const { access, refresh } = data;
    const { exp: expAccess } = jwt_decode(access);
    const { exp: expRefresh } = jwt_decode(refresh);

    const acss = { token: access, exp: expAccess };
    const refs = { token: refresh, exp: expRefresh };
    yield put({
      type: LOGIN_SUCCESS,
      payload: { access: acss, refresh: refs },
    });
    displayMessageAction("success", "You're successfully logged in.", 10000);
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, payload: err.message });
    displayMessageAction("error", err.message, false);
  }
}

export function* watchAddingAuthTokenAsync() {
  yield takeLatest(LOGIN_REQUEST, addingAuthTokenAsync);
}

export function* removingAuthTokenAsync() {
  yield put({ type: LOGOUT_SUCCESS });
  displayMessageAction("success", "You're successfully logged out.", 5000);
}

export function* watchRemovingAuthTokenAsync() {
  yield takeEvery(LOGOUT_REQUEST, removingAuthTokenAsync);
}

export function* refreshingTokenAsync({ payload }) {
  try {
    const { access, refresh } = payload;

    const { exp: expAccess } = jwt_decode(access);
    const { exp: expRefresh } = jwt_decode(refresh);

    const acss = { token: access, exp: expAccess };
    const refs = { token: refresh, exp: expRefresh };
    yield put({
      type: REFRESH_TOKEN_SUCCESS,
      payload: { access: acss, refresh: refs },
    });
  } catch (err) {
    yield put({ type: REFRESH_TOKEN_FAILURE });
  }
}

export function* watchRefreshingTokenAsync() {
  yield takeLatest(REFRESH_TOKEN_REQUEST, refreshingTokenAsync);
}

export function* authSaga() {
  yield all([
    watchAddingNewUserAsync(),
    watchAddingAuthTokenAsync(),
    watchRemovingAuthTokenAsync(),
    watchRefreshingTokenAsync(),
  ]);
}
