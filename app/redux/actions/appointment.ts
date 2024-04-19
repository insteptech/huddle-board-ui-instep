import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axiosInstance';

export interface IGetAppointmentsListPayload {
  page_size: number,
  page: number
} 

export const getAppointmentsList = createAsyncThunk('getAppointmentsList', async (payload: IGetAppointmentsListPayload) => {
  const result = await axiosInstance.get(`appointment-details/?page_size=${payload.page_size}&page=${payload.page}`, payload);
  return result.data;
});