import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadPartiesAction } from "../store";

function useParties() {
  const dispatch = useDispatch();

  return {
    parties: useSelector((state) => state.parties.data),
    isLoading: useSelector((state) => state.parties.loading),
    error: useSelector((state) => state.parties.error),
    getParties: useCallback(() => dispatch(loadPartiesAction()), [dispatch]),
  };
}

export default useParties;
