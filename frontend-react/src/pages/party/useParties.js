import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadPartiesAction } from "../../store";

function useParties() {
  const dispatch = useDispatch();

  return {
    parties: useSelector((state) => state.parties.data),
    error: useSelector((state) => state.error),
    getParties: useCallback(() => dispatch(loadPartiesAction()), [dispatch]),
  };
}

export default useParties;
