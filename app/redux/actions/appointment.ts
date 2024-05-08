import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axiosInstance';
import { FiltersDataState } from '../slices/appointment';
import { urlParams } from '@/app/utils/helper';

export interface IGetAppointmentsListPayload {
  page_size: number,
  page: number
}

export interface IGetAppointmentDetailPayload {
  appointment_id: string;
}

export interface IUpdateAppointmentDetailPayload {
  action : { 
  test_ordered?: boolean;
  clinician_agrees?: boolean;
  clinician_disagrees?: boolean;
  }
  appointment_id: string;
  screening_id: string;
}

export interface ICreateFilterPayload {
  filter_name: string,
  visit_type: string[],
  screening: string[],
  provider: string[]
}

export const getAppointmentsList = createAsyncThunk('getAppointmentsList', async (payload: FiltersDataState) => {  
  const result = await axiosInstance.get(`appointment-details/?${urlParams(payload)}`, payload);
  return result.data;
});

export const getAppointmentDetail = createAsyncThunk('getAppointmentDetail', async (payload: IGetAppointmentDetailPayload) => {
  const result = await axiosInstance.get(`appointment-details/${payload.appointment_id}`, payload);
  return result.data;
});

export const updateAppointmentDetail = createAsyncThunk('updateAppointmentDetail', async (payload: IUpdateAppointmentDetailPayload) => {
  const result = await axiosInstance.put(`appointment-details/${payload.appointment_id}/${payload.screening_id}`, payload.action);
  return result.data;
});

export const getFiltersData = createAsyncThunk('getFiltersData', async () => {  
  const result = await axiosInstance.get(`filter-data`);
  return result.data;
});

export const createAppointmentFilter = createAsyncThunk('createFilter', async (payload: ICreateFilterPayload) => {  
  const result = await axiosInstance.post(`filters`, payload);
  return result.data;
});