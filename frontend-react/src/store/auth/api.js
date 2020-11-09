import api from "../config";
import apiAuth from "../config.auth";
import authHeader from "../../services/auth-header";

export const addAuthTokenApi = async (creds) => {
  try {
    const response = await api.post("/api/user/token/", creds);
    return response.data;
  } catch (e) {
    throw Error(e.response.data.detail);
  }
};

export const addNewUserApi = async (creds) => {
  try {
    const response = await api.post("/api/user/create/", creds);
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
};

export const activateUserApi = async (creds) => {
  try {
    const { uid, token } = creds;
    console.log("activate api");
    const response = await api.get(`/api/user/activate/${uid}/${token}/`);
    return response.data;
  } catch (e) {
    throw Error(e.response.data.error);
  }
};

export const resetPasswordApi = async (creds) => {
  try {
    const response = await api.post(`/api/user/reset_password/`, creds);
    return response.data;
  } catch (e) {
    throw Error(...e.response.data.error);
  }
};

export const resetPasswordConfirmApi = async (creds) => {
  try {
    const { uid, token } = creds;
    const response = await api.get(
      `/api/user/reset_password_confirm/${uid}/${token}/`
    );
    return response.data;
  } catch (e) {
    throw Error(e.response);
  }
};

export const resetPasswordConfirmPostApi = async (creds) => {
  try {
    const { uid, token, new_password1, new_password2 } = creds;
    const response = await api.post(
      `/api/user/reset_password_confirm/${uid}/${token}/`,
      { new_password1, new_password2 }
    );
    return response.data;
  } catch (e) {
    throw Error(e.response.data.message || e.response.statusText);
  }
};

export const changePasswordApi = async (creds) => {
  try {
    const response = await apiAuth().patch(
      "/api/user/password_change/",
      creds,
      { headers: authHeader() }
    );
    return response.data;
  } catch (e) {
    throw Error(
      ...(e.response.data.old_password ||
        e.response.data.non_field_errors ||
        e.response.statusText)
    );
  }
};
