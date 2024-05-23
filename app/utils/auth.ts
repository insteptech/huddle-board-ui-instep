import axios from 'axios';
import { access } from 'fs';
import jwt from 'jsonwebtoken';

let API_URL = process.env.REACT_APP_API_URL;
API_URL = "https://dev-api.pdap.doctustech.com/api/";
export const slug = "c5c16a0b-f012-4ef5-b6d7-22cf8a588868";

export const decodeToken = function (token: any) {
  if (!token) {
    return null;
  }
  const decoded = jwt.decode(token);
  return decoded;
};

export function isAuthenticated(token?: string|null) {
  if (!token) {
    return false;
  }
  const { exp }: any = decodeToken(token);

  let currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 2);
var a = Math.round(new Date(currentDate).getTime() + 1) / 1000;

  // try {
  //   const { exp }: any = decodeToken(token);
  //   if (exp > (new Date(currentDate))) {
  //     return true;
  //   }
  // } catch (err) {
  //   return false;
  // }
  // return false;
}

export function isTokenExpired(token?:string|null) {
  if (!token) {
      return true; // Token is missing
  }

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const decodedToken = JSON.parse(atob(base64));
  
  if (!decodedToken.exp) {
      return true; // Token doesn't have an expiration time
  }

  // JWT expiration time is in seconds, so convert it to milliseconds
  const expirationTime = decodedToken.exp * 1000;
  const currentTime = Date.now();

  // Calculate the difference between the current time and expiration time
  const timeDifference = expirationTime - currentTime;

  // Check if the token is expired (within 2 hours or 7200000 milliseconds)
  if (timeDifference < 7200000) {
      return true; // Token is expired
  } else {
      return false; // Token is still valid
  }
}


export const sessionKeys = {accessToken:"access_token", slugKey:"slug", refreshToken:"refresh_token"};

export const getAndSetAccessToken = async () => {
  const { accessToken, slugKey, refreshToken } = sessionKeys;
  const refresh = localStorage.getItem(refreshToken);
  const access = localStorage.getItem(accessToken);
  const isExpired = isTokenExpired(access);

  if (refresh && access && !isExpired) return;

  const fetchNewTokens = async () => {
    const response = await axios.post(`${API_URL}slug-token/`, { slug });
    if (response && response.data) {
      const { access: newAccessToken, refresh: newRefreshToken } = response.data;
      localStorage.setItem(accessToken, newAccessToken);
      localStorage.setItem(refreshToken, newRefreshToken);
      return;
    }
  };

  const refreshTokens = async () => {
    const response = await axios.post(`${API_URL}token/refresh/`, { "refresh": refresh });
    if (response && response.data) {
      const { access: newAccessToken, refresh: newRefreshToken } = response.data;
      localStorage.setItem(accessToken, newAccessToken);
      localStorage.setItem(refreshToken, newRefreshToken);
      return;
    }
  };

  if (!refresh && !access) {
    await fetchNewTokens();
  } else if (refresh && access && isExpired) {
    await refreshTokens();
  }
};

export const accessToken = () => { return localStorage.getItem(sessionKeys.accessToken); }