import api from "../config";
import { parseItem } from "../action-utils";

export const loadPartiesApi = async () => {
  const response = await api.get("/api/parties/");
  return parseItem(response, 200);
};
