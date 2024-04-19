import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axiosInstance';
import axios from 'axios';

export interface IGetAccessTokenPayload {
  slug: string,
} 

export const signInCall = createAsyncThunk('signInCall', async (payload: IGetAccessTokenPayload) => {
  const result = await axiosInstance.post('slug-token', payload);
  return result.data;
});

export const token = createAsyncThunk('signInCall', async (payload: IGetAccessTokenPayload) => {
  const result = await axios.post('https://dev-api.pdap.doctustech.com/api/slug-token', payload);
  return result.data;
});