import axios, { baseURL } from "./config";

import { loadState } from "../services/localStorage";

export const api = (store) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return new Promise((resolve) => {
        const originalRequest = error.config;
        const refreshToken = loadState().auth.data.refresh.token;
        if (!refreshToken) {
          throw error;
        }
        if (
          error.response &&
          error.response.status === 401 &&
          error.config &&
          !error.config.__isRetryRequest &&
          refreshToken
        ) {
          originalRequest._retry = true;

          const response = fetch(baseURL + "/api/user/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: refreshToken,
            }),
          })
            .then((res) => {
              if (res.ok) return res.json();
              // history.push('/login')
              // throw error;
            })
            .then((res) => {
              store.dispatch({
                type: "REFRESH_TOKEN_REQUEST",
                payload: { access: res.access, refresh: refreshToken },
              });
              originalRequest.headers["Authorization"] = `Bearer ${res.access}`;
              return axios(originalRequest);
            })
            .catch((error) => {
              // Refresh failure
              store.dispatch({
                type: "REFRESH_TOKEN_REQUEST",
                payload: {},
              });
              return Promise.reject(error);
            });
          resolve(response);
        }
        console.log("Before Promise.reject(error)");
      });
    }
  );

  return axios;
};

export default api;
