import { put, takeEvery, call, all } from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './auth.actions';
import { addAuthTokenApi } from './auth.api';

export function* addingAuthTokenAsync({ payload }) {
    try {
        const data = yield call(addAuthTokenApi, payload);
        if (data && data.access && data.refresh) {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
        }
        yield put({ type: LOGIN_SUCCESS, payload: data });
    } catch (err) {
        console.log('Error occured');
        yield put({ type: LOGIN_FAILURE, payload: err.message });
    }
}

export function* watchAddingAuthTokenAsync() {
    yield takeEvery(LOGIN_REQUEST, addingAuthTokenAsync);
}

export function* authSaga() {
    yield all([watchAddingAuthTokenAsync()]);
}
