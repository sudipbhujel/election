import api from "../config";

export const loadStateApi = async () => {
  try {
    const response = await api.get("/api/state/");
    return response.data;
  } catch (e) {
    throw Error(e.response.data);
  }
};
