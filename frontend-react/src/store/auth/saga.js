import {
  put,
  takeEvery,
  takeLatest,
  call,
  all,
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
} from "./actions";
import { addAuthTokenApi } from "./api";

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
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, payload: err.message });
  }
}

export function* watchAddingAuthTokenAsync() {
  yield takeLatest(LOGIN_REQUEST, addingAuthTokenAsync);
}

export function* removingAuthTokenAsync() {
  yield put({ type: LOGOUT_SUCCESS });
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
    watchAddingAuthTokenAsync(),
    watchRemovingAuthTokenAsync(),
    watchRefreshingTokenAsync(),
  ]);
}
