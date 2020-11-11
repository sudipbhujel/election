import { put, takeEvery, call, all } from "redux-saga/effects";

import { LOAD_STATE, LOAD_STATE_SUCCESS, LOAD_STATE_ERROR } from "./actions";
import { loadStateApi } from "./api";

export function* loadingStateAsync() {
  try {
    const data = yield call(loadStateApi);

    yield put({ type: LOAD_STATE_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: LOAD_STATE_ERROR, payload: err.message });
  }
}

export function* watchloadingStateAsync() {
  yield takeEvery(LOAD_STATE, loadingStateAsync);
}

export function* stateSaga() {
  yield all([watchloadingStateAsync()]);
}
