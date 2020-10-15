import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
  ADD_PROFILE,
  ADD_PROFILE_SUCCESS,
  ADD_PROFILE_ERROR,
} from "./actions";
import { loadProfileApi, addProfileApi } from "./api";

export function* loadingProfileAsync() {
  try {
    const data = yield call(loadProfileApi);

    yield put({ type: LOAD_PROFILE_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: LOAD_PROFILE_ERROR, payload: err.message });
  }
}

export function* watchloadingProfileAsync() {
  yield takeEvery(LOAD_PROFILE, loadingProfileAsync);
}

export function* addingProfileAsync({ payload }) {
  try {
    const data = yield call(addProfileApi, payload);
    const addedProfile = data;

    yield put({ type: ADD_PROFILE_SUCCESS, payload: addedProfile });
  } catch (err) {
    yield put({ type: ADD_PROFILE_ERROR, payload: err.message });
  }
}

export function* watchAddingProductAsync() {
  yield takeEvery(ADD_PROFILE, addingProfileAsync);
}

export function* profileSaga() {
  yield all([watchloadingProfileAsync(), watchAddingProductAsync()]);
}
