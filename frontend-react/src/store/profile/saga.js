import { put, takeEvery, call, all } from "redux-saga/effects";

import { displayMessageAction } from "../toast/actions";
import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
  ADD_PROFILE,
  ADD_PROFILE_SUCCESS,
  ADD_PROFILE_FAILURE,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
} from "./actions";
import { loadProfileApi, addProfileApi, editProfileApi } from "./api";

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
    displayMessageAction("success", "You have successfully registered.");
  } catch (err) {
    yield put({ type: ADD_PROFILE_FAILURE, payload: err.message });
    err.message.map((message) => displayMessageAction("error", message));
  }
}

export function* watchAddingProfileAsync() {
  yield takeEvery(ADD_PROFILE, addingProfileAsync);
}

export function* editProfileAsync({ payload }) {
  try {
    const data = yield call(editProfileApi, payload);
    const editedProfile = data;

    yield put({ type: EDIT_PROFILE_SUCCESS, payload: editedProfile });
    displayMessageAction(
      "success",
      "You have successfully updated your profile."
    );
  } catch (err) {
    yield put({ type: EDIT_PROFILE_FAILURE, payload: err.message });
    displayMessageAction("error", "Error has occured.")
  }
}

export function* watchEditingProductAsync() {
  yield takeEvery(EDIT_PROFILE, editProfileAsync);
}

export function* profileSaga() {
  yield all([
    watchloadingProfileAsync(),
    watchAddingProfileAsync(),
    watchEditingProductAsync(),
  ]);
}
