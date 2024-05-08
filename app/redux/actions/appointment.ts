import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance, axiosWrapper } from '../config/axiosInstance';
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
  return await axiosWrapper({method:"get", url:`appointment-details/?${urlParams(payload)}`,payload})
});

export const getAppointmentDetail = createAsyncThunk('getAppointmentDetail', async (payload: IGetAppointmentDetailPayload) => {
  return await axiosWrapper({method:"get", url:`appointment-details/${payload.appointment_id}`,payload})
});

export const updateAppointmentDetail = createAsyncThunk('updateAppointmentDetail', async (payload: IUpdateAppointmentDetailPayload) => {
  return await axiosWrapper({method:"put", url:`appointment-details/${payload.appointment_id}/${payload.screening_id}`, payload: payload.action})
});

export const getFiltersData = createAsyncThunk('getFiltersData', async () => {  
  return await axiosWrapper({method:"get", url:`filter-data`})
});

export const createAppointmentFilter = createAsyncThunk('createFilter', async (payload: ICreateFilterPayload) => {  
  return await axiosWrapper({method:"post", url:'filters/',payload})
});

export const getSelectedFilterList = createAsyncThunk('getSelectedFilterList', async () => {  
  return await axiosWrapper({method:"get", url:'select-filter-list'})
});