import { useDispatch, useSelector } from "react-redux";

import { requestLogoutAction } from "../../store";

export default function useLogout() {
  const dispatch = useDispatch();

  return {
    error: useSelector((state) => state.error),
    removeAuthToken: () => dispatch(requestLogoutAction()),
  };
}
