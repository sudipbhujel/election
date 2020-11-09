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
import {
  addAuthTokenApi,
  addNewUserApi,
  activateUserApi,
  resetPasswordApi,
  resetPasswordConfirmApi,
  resetPasswordConfirmPostApi,
} from "./api";

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

export function* activatingUserAsync({ payload }) {
  try {
    const data = yield call(activateUserApi, payload);
    yield put({ type: USER_ACTIVATE_SUCCESS, payload: data });
    displayMessageAction(
      "success",
      "You've successfully activated your account."
    );
  } catch (err) {
    yield put({ type: USER_ACTIVATE_FAILURE, payload: err.message });
    displayMessageAction("error", err.message);
  }
}

export function* watchactivatingUserAsync() {
  yield takeLatest(USER_ACTIVATE_REQUEST, activatingUserAsync);
}

export function* resetingPasswordAsync({ payload }) {
  try {
    const data = yield call(resetPasswordApi, payload);
    yield put({ type: RESET_PASSWORD_SUCCESS, payload: data });
    displayMessageAction("success", "Password link is sent to your email.");
  } catch (err) {
    yield put({ type: RESET_PASSWORD_FAILURE, payload: err.message });
    displayMessageAction("error", err.message);
  }
}

export function* watchresetingPasswordAsync() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetingPasswordAsync);
}

export function* resetingPasswordConfirmAsync({ payload }) {
  try {
    const data = yield call(resetPasswordConfirmApi, payload);
    yield put({ type: RESET_PASSWORD_CONFIRM_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: RESET_PASSWORD_CONFIRM_FAILURE, payload: err.message });
  }
}

export function* watchresetingPasswordConfirmAsync() {
  yield takeLatest(
    RESET_PASSWORD_CONFIRM_REQUEST,
    resetingPasswordConfirmAsync
  );
}

export function* resetingPasswordConfirmPostAsync({ payload }) {
  try {
    const data = yield call(resetPasswordConfirmPostApi, payload);
    yield put({ type: RESET_PASSWORD_CONFIRM_DONE_SUCCESS, payload: data });
    displayMessageAction("success", "You've successfully reseted password.");
  } catch (err) {
    yield put({
      type: RESET_PASSWORD_CONFIRM_DONE_FAILURE,
      payload: err.message,
    });
    displayMessageAction("error", err.message);
  }
}

export function* watchresetingPasswordConfirmPostAsync() {
  yield takeLatest(
    RESET_PASSWORD_CONFIRM_DONE_REQUEST,
    resetingPasswordConfirmPostAsync
  );
}

export function* authSaga() {
  yield all([
    watchAddingNewUserAsync(),
    watchAddingAuthTokenAsync(),
    watchRemovingAuthTokenAsync(),
    watchRefreshingTokenAsync(),
    watchactivatingUserAsync(),
    watchresetingPasswordAsync(),
    watchresetingPasswordConfirmAsync(),
    watchresetingPasswordConfirmPostAsync(),
  ]);
}
