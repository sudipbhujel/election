import axios, { baseURL } from "./config";

// import {yield} from "redux-saga/effects"
// import history from '../history';
import { loadState, saveState } from "../services/localStorage";

const api = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return new Promise((resolve) => {
        const originalRequest = error.config;
        const refreshToken = loadState().auth.data.refresh;
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
              throw error;
            })
            .then((res) => {
              // localStorage.setItem("state").auth.data.access = res.access;
              // console.log("RES.ACCESS", res.access);
              // console.log(loadState().auth.data.access)
              // loadState().auth.data["access"] = "modified!"
              // loadState().auth.data.access.set("hello")
              // console.log(loadState())
              const auth = loadState().auth;

              // console.log(auth)

              saveState({
                auth: Object.assign({}, auth, {
                  data: { access: res.access, refresh: refreshToken },
                })
              });

              console.log(Object.assign({}, auth, {
                data: { access: res.access, refresh: refreshToken },
              }))

              console.log(loadState().auth)

              originalRequest.headers["Authorization"] = `Bearer ${res.access}`;
              return axios(originalRequest);
            })
            .catch((error) => Promise.reject(error));
          resolve(response);
        }
        return Promise.reject(error);
      });
    }
  );

  return axios;
};

export default api();
