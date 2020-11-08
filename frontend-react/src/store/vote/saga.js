import { put, takeLatest, call, all } from "redux-saga/effects";

import { displayMessageAction } from "../toast/actions";
import {
  REQUEST_BALLOT,
  REQUEST_BALLOT_SUCCESS,
  REQUEST_BALLOT_FAILURE,
  DO_VOTE_REQUEST,
  DO_VOTE_SUCCESS,
  DO_VOTE_FAILURE,
} from "./actions";

import { requestBallotApi, doVoteApi } from "./api";

export function* requestBallotAsync({ payload }) {
  try {
    const data = yield call(requestBallotApi, payload);
    const ballot = data;
    yield put({ type: REQUEST_BALLOT_SUCCESS, payload: ballot });
    displayMessageAction("success", "Your ballot is ready.");
  } catch (err) {
    yield put({ type: REQUEST_BALLOT_FAILURE, payload: err.message });
    displayMessageAction("error", err.message);
  }
}

export function* watchRequestingBallotAsync() {
  yield takeLatest(REQUEST_BALLOT, requestBallotAsync);
}

export function* doVoteAsync({ payload }) {
  try {
    const data = yield call(doVoteApi, payload);

    yield put({ type: DO_VOTE_SUCCESS, payload: data });
    displayMessageAction("success", "Your ballot is registerd.");
  } catch (err) {
    yield put({ type: DO_VOTE_FAILURE, payload: err.data || err.message });
    displayMessageAction(
      "error",
      "Error encountered. Only registered voter can vote."
    );
  }
}

export function* watchDoingVoteAsync() {
  yield takeLatest(DO_VOTE_REQUEST, doVoteAsync);
}

export function* voteSaga() {
  yield all([watchRequestingBallotAsync(), watchDoingVoteAsync()]);
}
