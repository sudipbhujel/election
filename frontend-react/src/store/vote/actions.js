export const REQUEST_BALLOT = "REQUEST_BALLOT";
export const REQUEST_BALLOT_SUCCESS = "REQUEST_BALLOT_SUCCESS";
export const REQUEST_BALLOT_ERROR = "REQUEST_BALLOT_ERROR";

export const DO_VOTE_REQUEST = "DO_VOTE_REQUEST";
export const DO_VOTE_SUCCESS = "DO_VOTE_SUCCESS";
export const DO_VOTE_ERROR = "DO_VOTE_ERROR";

export const requestBallotAction = (creds) => ({
  type: REQUEST_BALLOT,
  payload: creds,
});

export const doVoteAction = (ballot) => ({
  type: DO_VOTE_REQUEST,
  payload: ballot,
});
