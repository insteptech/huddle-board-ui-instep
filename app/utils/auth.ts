import { access } from 'fs';
import jwt from 'jsonwebtoken';

export const decodeToken = function (token: any) {
  if (!token) {
    return null;
  }
  const decoded = jwt.decode(token);
  return decoded;
};

export function isAuthenticated(token?: string) {
  if (!token) {
    return false;
  }
  let currentDate = 0;
  currentDate = new Date().setMinutes(new Date().getMinutes() - 5);
  try {
    const { exp }: any = decodeToken(token);
    if (exp > (new Date(currentDate).getTime() + 1) / 1000) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}


export const sessionKeys = {accessToken:"access_token", slugKey:"slug", refreshToken:"refresh_token"}