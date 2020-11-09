import api from "../config";

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
