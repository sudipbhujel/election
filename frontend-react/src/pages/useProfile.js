import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  loadProfileAction,
  addProfileAction,
  editProfileAction,
} from "../store";

function useProfile() {
  const dispatch = useDispatch();

  return {
    isAuthenticated: useSelector((state) => state.profile.isAuthenticated),
    profile: useSelector((state) => state.profile.data),
    error: useSelector((state) => state.error),
    getProfile: useCallback(() => dispatch(loadProfileAction()), [dispatch]),

    addProfile: (profile) => dispatch(addProfileAction(profile)),
    editProfile: (profile) => dispatch(editProfileAction(profile)),
  };
}

export default useProfile;
