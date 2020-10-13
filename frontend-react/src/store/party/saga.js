import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  LOAD_PARTIES,
  LOAD_PARTIES_SUCCESS,
  LOAD_PARTIES_ERROR,
} from "./actions";
import { loadPartiesApi } from "./api";

export function* loadingPartiesAsync() {
  try {
    const data = yield call(loadPartiesApi);
    yield put({ type: LOAD_PARTIES_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: LOAD_PARTIES_ERROR, payload: err.message });
  }
}

export function* watchloadinPartiesAsync() {
  yield takeEvery(LOAD_PARTIES, loadingPartiesAsync);
}

export function* partiesSaga() {
  yield all([watchloadinPartiesAsync()]);
}
