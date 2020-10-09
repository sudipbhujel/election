import api from '../config.auth';
import { parseList } from '../action-utils';
import authHeader from '../../services/auth-header';

export const loadCandidatesApi = async () => {
    const response = await api.get('/api/candidates/',{
        headers: authHeader()
    })
    return parseList(response, 200)
}
