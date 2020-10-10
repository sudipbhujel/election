import api from '../config.auth';
import { parseList } from '../action-utils';

export const loadCandidatesApi = async () => {
  const response = await api.get("/api/candidates/");
  return parseList(response, 200);
};
