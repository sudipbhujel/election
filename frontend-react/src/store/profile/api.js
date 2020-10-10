import api from '../config.auth';
import { parseItem } from '../action-utils';
import authHeader from '../../services/auth-header';

export const loadProfileApi = async () => {
    const response = await api.get('/api/profile/me/',{
        headers: authHeader()
    })
    return parseItem(response, 200)
}