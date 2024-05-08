import axios from 'axios';
import { access } from 'fs';
import jwt from 'jsonwebtoken';

let API_URL = process.env.REACT_APP_API_URL;
API_URL = "https://dev-api.pdap.doctustech.com/api/";

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
  const { accessToken, slugKey, refreshToken} = sessionKeys;
  const refresh = sessionStorage.getItem(refreshToken);
  const access = sessionStorage.getItem(accessToken);

  const isExpired = isTokenExpired(access);


  if ((!refresh && !access)|| isExpired) {
  const rs = await axios.post(`${API_URL}token/refresh/`,{"refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNTE0OTk3MCwiaWF0IjoxNzE0NTQ1MTcwLCJqdGkiOiJlNThiN2RjODAyMjE0NDUzYTc4ZjAwNWM2NjJmZWFkMiIsInVzZXJfaWQiOjF9.sZ7AJGzCrC9GOUZ4LyvxB6FAI99V-MJLxD3yN1Fqpck"});

    if (rs && rs.data) {
      let finalResponse = rs.data;
      const token = finalResponse.access; 
      const refresh = finalResponse.refresh; 
      sessionStorage.setItem(accessToken, token);
      sessionStorage.setItem(refreshToken, refresh);
    }
  }
}