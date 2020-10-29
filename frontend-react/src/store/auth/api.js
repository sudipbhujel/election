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
