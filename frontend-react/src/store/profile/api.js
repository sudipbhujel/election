import api from "../config";
import { parseItem } from "../action-utils";
import authHeader from "../../services/auth-header";

export const loadProfileApi = async () => {
  const response = await api.get("/api/profile/me/", {
    headers: authHeader(),
  });
  return parseItem(response, 200);
};

export const addProfileApi = async (profile) => {
  const response = await api.post("/api/profile/", profile, {
    headers: authHeader(),
  });
  return parseItem(response, 201);
};

export const editProfileApi = async (profile) => {
  const response = await api.patch("/api/profile/me/", profile, {
    headers: authHeader(),
  });
  return parseItem(response, 200);
};
