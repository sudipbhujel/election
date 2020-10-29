import { useDispatch, useSelector } from "react-redux";

import { requestSignUpAction } from "../../store";

function useAuths() {
  const dispatch = useDispatch();

  return {
    data: useSelector((state) => state.register.data),
    error: useSelector((state) => state.register.error),
    addAuthToken: (creds) => dispatch(requestSignUpAction(creds)),
  };
}

export default useAuths;
