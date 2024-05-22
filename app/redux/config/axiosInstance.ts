
import axios from "axios";
import { toast } from 'react-toastify';

import { getAndSetAccessToken, isAuthenticated,isTokenExpired,sessionKeys } from "../../utils/auth";

export let API_URL = process.env.REACT_APP_API_URL;
API_URL = "https://dev-api.pdap.doctustech.com/api/"

const { accessToken, slugKey, refreshToken} = sessionKeys;

const onRequest = async (config:any) => {
  const refresh = sessionStorage.getItem(refreshToken)
  const access = sessionStorage.getItem(accessToken);
  getAndSetAccessToken();
  config.headers["Authorization"] = `JWT ${access}`;
  return config;
};

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

export const axiosWrapper = async (config:any) => {
  try {
    const response = await axiosInstance[config.method](config.url,config.payload);
      return response.data;
  } catch (error:any) {
      if(error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else throw error;
  }
};