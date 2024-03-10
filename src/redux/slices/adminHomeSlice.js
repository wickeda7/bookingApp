import { createSlice } from '@reduxjs/toolkit';
import { getWalkIn } from '../actions/adminHomeAction';
const initialState = {
  staff: [],
  walkin: [],
  appointment: [],
  isLoading: false,
};

export const adminHomeSlice = createSlice({
  name: 'adminHome',
  initialState,
  reducers: {
    setStaff: (state, action) => {
      state.staff = action.payload;
      state.isLoading = true;
    },
    setWalkin: (state, action) => {
      state.walkin = action.payload;
    },
    setAppointment: (state, action) => {
      state.appointment = [...state.appointment, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWalkIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWalkIn.fulfilled, (state, action) => {
        state.walkin = action.payload;
        state.isLoading = false;
      })
      .addCase(getWalkIn.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setStaff, setWalkin, setAppointment } = adminHomeSlice.actions;
export default adminHomeSlice.reducer;
