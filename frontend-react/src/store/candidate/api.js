<<<<<<< HEAD:frontend-react/src/store/candidate.api.js
<<<<<<< Updated upstream:frontend-react/src/store/candidate.api.js
import api from './config.auth';
import { parseList } from './action-utils';
import authHeader from '../services/auth-header';
=======
import api from "../config";
import { parseList } from "../action-utils";
import authHeader from "../../services/auth-header";
>>>>>>> Stashed changes:frontend-react/src/store/candidate/api.js
=======
import api from '../config.auth';
import { parseList } from '../action-utils';
import authHeader from '../../services/auth-header';
>>>>>>> origin/frontend:frontend-react/src/store/candidate/api.js

export const loadCandidatesApi = async () => {
  const response = await api.get("/api/candidates/");
  return parseList(response, 200);
};
