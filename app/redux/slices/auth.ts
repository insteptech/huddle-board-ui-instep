import { createSlice } from '@reduxjs/toolkit';
import { signInCall } from '../actions/auth';

export type AuthState = {
  loggedInUser: { token: ''; user: null; permissions: null };
};

const initialState: AuthState = {
  loggedInUser: { token: '', user: null, permissions: null },
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInCall.pending, (state, action) => {
      console.log(state, action, 'pending');
    });
    builder.addCase(signInCall.rejected, (state, action) => {
      console.log(state, action, 'rejected');
    });
    builder.addCase(signInCall.fulfilled, (state, action) => {
      console.log(state, action, 'fulfilled');
    });
  },
});

export const { setLoggedInUser } = auth.actions;
export default auth.reducer;
