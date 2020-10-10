import axios, { baseURL } from './config';
// import history from '../history';

const api = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return new Promise((resolve) => {
                const originalRequest = error.config;
                const refreshToken = localStorage.getItem('refresh_token');
                if (error.response && error.response.status === 401 &&
                    error.config && !error.config.__isRetryRequest &&
                    refreshToken) {
                    originalRequest._retry = true;

                    const response = fetch(baseURL + '/api/user/token/refresh/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            refresh: refreshToken,
                        }),
                    })
                        .then((res) => {
                            if (res.ok) res.json();
                            // history.push('/login')
                            return Promise.reject(error);
                        })
                        .then((res) => {
                            localStorage.setItem('access_token', res.access);
                            originalRequest.headers['Authorization'] = `Bearer ${res.access}`;
                            return axios(originalRequest);
                        })
                        .catch(error => Promise.reject(error))
                    resolve(response);
                }
                return Promise.reject(error);
            });
        },
    );

    return axios;
};

export default api();
