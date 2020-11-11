import { put, takeEvery, call, all } from "redux-saga/effects";

import { LOAD_STATS, LOAD_STATS_SUCCESS, LOAD_STATS_ERROR } from "./actions";
import { loadStatsApi } from "./api";

export function* loadingStatsAsync() {
  try {
    const data = yield call(loadStatsApi);

    yield put({ type: LOAD_STATS_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: LOAD_STATS_ERROR, payload: err.message });
  }
}

export function* watchloadingStatsAsync() {
  yield takeEvery(LOAD_STATS, loadingStatsAsync);
}

export function* statsSaga() {
  yield all([watchloadingStatsAsync()]);
}
