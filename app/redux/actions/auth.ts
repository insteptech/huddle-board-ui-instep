import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axiosInstance';

export interface IGetAccessTokenPayload {
  slug: string,
} 

export const signInCall = createAsyncThunk('signInCall', async (payload: IGetAccessTokenPayload) => {
  const result = await axiosInstance.post('slug-token', payload);
  return result.data;
});