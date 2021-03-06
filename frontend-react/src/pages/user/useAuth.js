import { useDispatch, useSelector } from "react-redux";

import {
  requestUserActivateAction,
  requestResetPasswordAction,
  requestResetPasswordConfirmAction,
  requestResetPasswordConfirmPostAction,
  requestChangePasswordAction,
} from "../../store";

function useAuths() {
  const dispatch = useDispatch();

  return {
    activate: useSelector((state) => state.activate.data),
    error: useSelector((state) => state.activate.error),
    requestUserActivate: (creds) => dispatch(requestUserActivateAction(creds)),

    reset: useSelector((state) => state.reset),
    requestResetPassword: (creds) =>
      dispatch(requestResetPasswordAction(creds)),
    requestResetPasswordConfirm: (creds) =>
      dispatch(requestResetPasswordConfirmAction(creds)),
    requestResetPasswordConfirmPost: (creds) =>
      dispatch(requestResetPasswordConfirmPostAction(creds)),

    changepwd: useSelector((state) => state.changepwd),
    requestChangePassword: (creds) =>
      dispatch(requestChangePasswordAction(creds)),
  };
}

export default useAuths;
