import { put, takeLatest, call, all } from "redux-saga/effects";

import {
  REQUEST_BALLOT,
  REQUEST_BALLOT_SUCCESS,
  REQUEST_BALLOT_ERROR,
  DO_VOTE_REQUEST,
  DO_VOTE_SUCCESS,
  DO_VOTE_ERROR,
} from "./actions";

import { requestBallotApi, doVoteApi } from "./api";

export function* requestBallotAsync({ payload }) {
  try {
    const data = yield call(requestBallotApi, payload);
    const ballot = data;
    yield put({ type: REQUEST_BALLOT_SUCCESS, payload: ballot });
  } catch (err) {
    yield put({ type: REQUEST_BALLOT_ERROR, payload: err.message });
  }
}

export function* watchRequestingBallotAsync() {
  yield takeLatest(REQUEST_BALLOT, requestBallotAsync);
}

export function* doVoteAsync({ payload }) {
  try {
    const data = yield call(doVoteApi, payload);

    yield put({ type: DO_VOTE_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: DO_VOTE_ERROR, payload: err.data || err.message });
  }
}

export function* watchDoingVoteAsync() {
  yield takeLatest(DO_VOTE_REQUEST, doVoteAsync);
}

export function* voteSaga() {
  yield all([watchRequestingBallotAsync(), watchDoingVoteAsync()]);
}
