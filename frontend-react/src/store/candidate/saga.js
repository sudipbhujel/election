import { put, takeEvery, call, all } from 'redux-saga/effects';
import {
    LOAD_CANDIDATE,
    LOAD_CANDIDATE_SUCCESS,
    LOAD_CANDIDATE_ERROR
} from './actions';
import { loadCandidatesApi } from './api';

export function* loadingCandidatesAsync() {
    try {
        const data = yield call(loadCandidatesApi);
        const candidates = [...data];

        yield put({ type: LOAD_CANDIDATE_SUCCESS, payload: candidates });
    } catch (err) {
        yield put({ type: LOAD_CANDIDATE_ERROR, payload: err.message });
    }
}

export function* watchLoadingCandidatesAsync() {
    yield takeEvery(LOAD_CANDIDATE, loadingCandidatesAsync);
}

export function* candidateSaga() {
    yield all([watchLoadingCandidatesAsync()]);
}
