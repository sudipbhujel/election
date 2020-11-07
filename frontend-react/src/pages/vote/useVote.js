import { useDispatch, useSelector } from "react-redux";

import { requestBallotAction, doVoteAction } from "../../store";

function useVote() {
  const dispatch = useDispatch();

  return {
    ballot: useSelector((state) => state.vote),
    error: useSelector((state) => state.error),
    requestBallot: (creds) => dispatch(requestBallotAction(creds)),
    doVote: (ballot) => dispatch(doVoteAction(ballot)),
  };
}

export default useVote;
