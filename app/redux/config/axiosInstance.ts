
import axios from "axios";
import { isAuthenticated,isTokenExpired,sessionKeys } from "../../utils/auth";

let API_URL = process.env.REACT_APP_API_URL;
API_URL = "https://dev-api.pdap.doctustech.com/api/"

const { accessToken, slugKey, refreshToken} = sessionKeys;

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
  const access = sessionStorage.getItem(accessToken);

  getAndSetAccessToken();
  // if (!isAuthenticated()) {
  //   if (refresh) {
  //     try {
  //       const rs = await axios.post(`${API_URL}token/refresh`, {
  //         refresh,
  //       });
  //       if (rs && rs.data) {
  //         let finalResponse = rs.data;
  //         const token = finalResponse.data.access; 
  //         const refresh = finalResponse.data.refresh; 
  //         sessionStorage.setItem(accessToken, token);
  //         sessionStorage.setItem(refreshToken, refresh);
  //       }
  //     } catch (_error) {
  //       logout();
  //       return Promise.reject(_error);
  //     }
  //   }
  // }

  config.headers["Authorization"] = `JWT ${access}`;
  return config;
};

const getAndSetAccessToken = async (data?:any) => {
  const refresh = sessionStorage.getItem(refreshToken);
  const access = sessionStorage.getItem(accessToken);

  const isExpired = isTokenExpired(access);


  if ((!refresh && !access)|| isExpired) {
  const rs = await axios.post(`${API_URL}token/refresh/`,{"refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNDU0MjIyNSwiaWF0IjoxNzEzOTM3NDI1LCJqdGkiOiI5Y2I1Yzg5MzY4YWY0OWFjYWY2NDQ5YzE3NmEwZmFlZSIsInVzZXJfaWQiOjF9.1IK9KpBQrP6k9P_LBWBJ3NZhT1HQUK-zvPoE4bnFSDk"});

    if (rs && rs.data) {
      let finalResponse = rs.data;
      const token = finalResponse.access; 
      const refresh = finalResponse.refresh; 
      sessionStorage.setItem(accessToken, token);
      sessionStorage.setItem(refreshToken, refresh);
    }
  }
}

const onRequestError = (error:any) => {
  return Promise.reject(error);
};

const onResponse = (response:any) => {
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
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

export const axiosInstance = setupInterceptorsTo(
  axios.create({
    baseURL: API_URL,
  })
);
