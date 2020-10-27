import api from "../config.auth";
import authHeader from "../../services/auth-header";

export const loadProfileApi = async () => {
  try {
    const response = await api().get("/api/profile/me/", {
      headers: authHeader(),
    });
    return response.data;
  } catch (e) {
    throw Error(e.response.data);
  }
};

export const addProfileApi = async (profile) => {
  try {
    const response = await api().post("/api/profile/", profile, {
      headers: authHeader(),
    });
    return response.data;
  } catch (e) {
    throw Error(e.response.data);
  }
};

export const editProfileApi = async (profile) => {
  try {
    const response = await api().patch("/api/profile/me/", profile, {
      headers: authHeader(),
    });
    return response.data;
  } catch (e) {
    throw Error(e.response.data);
  }
};
