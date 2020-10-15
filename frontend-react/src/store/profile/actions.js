export const LOAD_PROFILE = "LOAD_PROFILE";
export const LOAD_PROFILE_SUCCESS = "LOAD_PROFILE_SUCCESS";
export const LOAD_PROFILE_ERROR = "LOAD_PROFILE_ERROR";

export const ADD_PROFILE = "ADD_PROFILE";
export const ADD_PROFILE_SUCCESS = "ADD_PROFILE_SUCCESS";
export const ADD_PROFILE_ERROR = "ADD_PROFILE_ERROR";

export const loadProfileAction = () => ({
  type: LOAD_PROFILE,
});

export const addProfileAction = (profile) => ({
  type: ADD_PROFILE,
  payload: profile,
});
