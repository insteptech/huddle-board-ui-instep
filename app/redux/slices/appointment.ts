import { createSlice, current } from '@reduxjs/toolkit';
import { getAppointmentsList, getAppointmentDetail } from '../actions/appointment';

export type AppointmentsState = {
    appointmentsData: {
        results?: AppointmentState[],
        count?: number,
        next?: string | null,
        previous?: string | null
    };
    appointmentDetail: AppointmentDetail[];
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

export type AppointmentDetail = {
  uuid: String,
  appointment_id: String,
  clinician_agrees: boolean,
  clinician_disagrees: boolean,
  test_ordered: boolean,
  screening: String,
  action: String,
  description: String,
  screening_uuid: String
}

const initialState: AppointmentsState = {
    appointmentsData: {},
    appointmentDetail: []
};

export const appointment = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getAppointmentsList.pending, (state, action) => {
    });
    builder.addCase(getAppointmentsList.rejected, (state, action) => {
      console.log(state, action, 'rejected');
    });
    builder.addCase(getAppointmentsList.fulfilled, (state, { payload }) => {
      state.appointmentsData = appointmentsList(current(state)?.appointmentsData?.results, payload);
    });

    builder.addCase(getAppointmentDetail.pending, (state, action) => {
    });
    builder.addCase(getAppointmentDetail.rejected, (state, action) => {
      console.log(state, action, 'rejected');
    });
    builder.addCase(getAppointmentDetail.fulfilled, (state, { payload }) => {
      state.appointmentDetail = payload;
    });
  },
});

const appointmentsList = (previousAppointments: any, payload: any) => {    
  var clonesPreviousAppointments = new Array(previousAppointments)[0] || [];
  if (clonesPreviousAppointments && payload?.results) {
    var dummyArray = payload.results;
    clonesPreviousAppointments = clonesPreviousAppointments.concat(dummyArray);

    const uniqueAppointments = clonesPreviousAppointments.filter((obj: { uuid: any; }, index: any, self: any[]) => 
      index === self.findIndex((t: { uuid: any; }) => (
        t.uuid === obj.uuid
      ))
    );

    const initialData = {
      results: uniqueAppointments,
      count: payload.count,
      next: payload.next,
      previous: payload.previous
    };
    return initialData;
  }
  return {
    results:[],
    count: 0,
    next:'',
    previous:''
  }
};

export const { } = appointment.actions;
export default appointment.reducer;
