import { createSlice } from '@reduxjs/toolkit';
import { getAppointmentsList } from '../actions/appointment';

export type AppointmentsState = {
    appointmentsData: {
        results?: AppointmentState[],
        count?: number,
        next?: string | null,
        previous?: string | null
    };
};

export type AppointmentState = {
    uuid: String,
    patient_name: String,
    appointment_timestamp: String,
    visit_type: String,
    gap_count: Number,
    selected_gap_count: Number,
    screening: String[],
    provider: String,
    mrn: String
}

const initialState: AppointmentsState = {
    appointmentsData: {},
};

export const appointment = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getAppointmentsList.pending, (state, action) => {
      console.log(state, action, 'pending');
    });
    builder.addCase(getAppointmentsList.rejected, (state, action) => {
      console.log(state, action, 'rejected');
    });
    builder.addCase(getAppointmentsList.fulfilled, (state, { payload }) => {
      console.log(state, payload, 'fulfilled');
      state.appointmentsData = payload;
    });
  },
});

export const { } = appointment.actions;
export default appointment.reducer;
