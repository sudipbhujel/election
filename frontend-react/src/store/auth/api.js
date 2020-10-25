import api from '../config';
import { parseItem } from '../action-utils';

export const addAuthTokenApi = async (creds) => {
    const response = await api.post('/api/user/token/', creds);
    return parseItem(response, 200);
};

export const refreshTokenApi = async (refreshToken) => {
    const response = await api.post('/api/user/token/refresh/', {"refresh": refreshToken});
    return parseItem(response, 200);
};
