import api from "../config";

export const loadStatsApi = async () => {
  try {
    const response = await api.get("/api/stats/");
    return response.data;
  } catch (e) {
    throw Error(e.response.data);
  }
};
