import { put, takeEvery, call, all } from 'redux-saga/effects';
import {
    LOAD_PROFILE,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_ERROR
} from './profile.actions';
import { loadProfileApi } from './profile.api';

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

export function* profileSaga() {
    yield all([watchloadingProfileAsync()]);
}
