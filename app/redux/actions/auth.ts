import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance, axiosWrapper } from '../config/axiosInstance';

export interface IGetAccessTokenPayload {
  slug: string,
} 

export const signInCall = createAsyncThunk('signInCall', async (payload: IGetAccessTokenPayload) => {
  const result = await axiosInstance.post('slug-token', payload);
  return result.data;
});

export const getToken = createAsyncThunk('getToken', async (payload: IGetAccessTokenPayload) => {
  const result = await axiosInstance.post('slug-token/', payload);
  return result.data;
});

export const getHuddleBoardConfig = createAsyncThunk('getHuddleBoardConfig', async () => {
  return await axiosWrapper({ method: "get", url: `huddle-board-config` })
});
