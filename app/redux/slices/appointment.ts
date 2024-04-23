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

const appointmentsList = (state: any, payload: any) => {    
  var array1 = new Array(state)[0] || [];
  if (array1 && payload?.results) {
    var array2 = payload.results;
    array1 = array1.concat(array2);

    const uniqueArr = array1.filter((obj: { uuid: any; }, index: any, self: any[]) => 
      index === self.findIndex((t: { uuid: any; }) => (
        t.uuid === obj.uuid
      ))
    );

    const initialData = {
      results: uniqueArr,
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
