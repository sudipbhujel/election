import { put, takeEvery, takeLatest, call, all } from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
} from './actions';
import { addAuthTokenApi } from './api';

export function* addingAuthTokenAsync({ payload }) {
    try {
        const data = yield call(addAuthTokenApi, payload);
        if (data && data.access && data.refresh) {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
        }
        yield put({ type: LOGIN_SUCCESS, payload: data });
    } catch (err) {
        console.log(err.message);
        yield put({ type: LOGIN_FAILURE, payload: err.message });
    }
}

export function* watchAddingAuthTokenAsync() {
    yield takeLatest(LOGIN_REQUEST, addingAuthTokenAsync);
}

export function* removingAuthTokenAsync() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    yield put({ type: LOGOUT_SUCCESS });
}

export function* watchRemovingAuthTokenAsync() {
    yield takeEvery(LOGOUT_REQUEST, removingAuthTokenAsync);
}

export function* authSaga() {
    yield all([watchAddingAuthTokenAsync(), watchRemovingAuthTokenAsync()]);
}
