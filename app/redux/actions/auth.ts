import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInterceptorInstance from '../config/axiosInstance';

export const signInCall = createAsyncThunk('signInCall', async (payload: any) => {
  const result = await axiosInterceptorInstance.post('auth/login', payload);
  return result.data;
});
