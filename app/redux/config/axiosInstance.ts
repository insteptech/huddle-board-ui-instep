
import axios from "axios";
import { isAuthenticated,sessionKeys } from "../../utils/auth";

let API_URL = process.env.REACT_APP_API_URL;
API_URL = "https://dev-api.pdap.doctustech.com/api/"

const {accessToken,slugKey, refreshToken} = sessionKeys;

export const withoutAuth = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function logout() {
  sessionStorage.removeItem(accessToken);
  sessionStorage.removeItem(refreshToken);
  sessionStorage.removeItem(slugKey);
  window.location.href = "/";
}

const onRequest = async (config:any) => {
  const refresh = sessionStorage.getItem(refreshToken)
  if (!isAuthenticated()) {
    if (refresh) {
      try {
        const rs = await axios.post(`${API_URL}token/refresh`, {
          refresh,
        });
        if (rs && rs.data) {
          let finalResponse = rs.data;
          const token = finalResponse.data.access; 
          const refresh = finalResponse.data.refresh; 
          sessionStorage.setItem(accessToken, token);
          sessionStorage.setItem(refreshToken, refresh);
        }
      } catch (_error) {
        logout();
        return Promise.reject(_error);
      }
    }
  }

  config.headers["Authorization"] = `Bearer ${sessionStorage.getItem(accessToken)}`;
  return config;
};

const onRequestError = (error:any) => {
  return Promise.reject(error);
};

const onResponse = (response:any) => {
  console.log(response,'config')
  return Promise.resolve(response);
};

const onResponseError = async (error:any) => {
  if (error.response) {
    if (
      error.response.status === 401 &&
      error.response.data.message === "jwt expired"
    ) {
      let refresh =sessionStorage.getItem(refreshToken)
      try {
        const rs = await axios.post(`${API_URL}token/refresh`, {
          refresh
        });
        if (rs && rs.data && rs.data.data) {
          let finalResponse = rs.data.data;
          const token = finalResponse.data.access; 
          const refresh = finalResponse.data.refresh; 
          sessionStorage.setItem(accessToken, token);
          sessionStorage.setItem(refreshToken, refresh);
        }
        return;
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
};

const setupInterceptorsTo = (axiosInstance : any) => {
  console.log('axiosInstanceL---',axiosInstance);
  
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

export const axiosInstance = setupInterceptorsTo(
  axios.create({
    baseURL: API_URL,
  })
);





// import axios from 'axios';
  

// const axiosInstance = axios.create({
//   baseURL: 'https://dev-api.pdap.doctustech.com/api/'
// });

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Modify the request config here (add headers, authentication tokens)
//     // const accessToken = JSON.parse(localStorage.getItem("token"));

//     // // If token is present, add it to request's Authorization Header
//     // if (accessToken) {
//     //   if (config.headers) config.headers.token = accessToken;
//     // }
//     return config;
//   },
//   (error) => {
//     // Handle request errors here
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Modify the response data here
//     return response;
//   },
//   (error) => {
//     // Handle response errors here
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

