import axios, { baseURL } from "./config";

import { loadState } from "../services/localStorage";

export const api = (store) => {
  const interceptor = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.config.headers["Authorization"]) {
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }

        axios.interceptors.response.eject(interceptor);
        const refreshToken = loadState().auth.data.refresh.token;
        if (!refreshToken) {
          throw error;
        }
        return axios
          .post("/api/user/token/refresh/", {
            refresh: refreshToken,
          })
          .then((res) => {
            store.dispatch({
              type: "REFRESH_TOKEN_REQUEST",
              payload: { access: res.data.access, refresh: refreshToken },
            });
            error.config.headers["Authorization"] = `Bearer ${res.data.access}`;
            return axios(error.config);
          })
          .catch((error) => {
            // Refresh failure
            if (error.response.status === 401) {
              store.dispatch({
                type: "REFRESH_TOKEN_REQUEST",
                payload: {},
              });
              return Promise.reject(error);
            }
            return Promise.reject(error);
          })
          .finally(api);
      }
      delete error.config.headers["Authorization"];
      throw error;
    }
  );

  return axios;
};

export default api;
