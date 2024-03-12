import { createSlice } from '@reduxjs/toolkit';
import { getBooking } from '../actions/adminHomeAction';
import { t } from 'i18next';
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
    setStaffService: (state, action) => {
      let { staff, booking } = action.payload;
      staff = { ...staff, available: false };
      const objectIndex = state.staff.findIndex((obj) => obj.id === staff.id);
      let prevStaff = state.staff;
      prevStaff.splice(objectIndex, 1);
      prevStaff.push(staff);
      state.staff = prevStaff;
      console.log('adminHomeSlice -> booking', booking);
      // console.log('adminHomeSlice -> object', object);
      // console.log('adminHomeSlice -> action', staff, service);
    },
    setStaff: (state, action) => {
      const staff = action.payload.map((item) => {
        return { ...item, available: true };
      });
      state.staff = staff;
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
      .addCase(getBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.appointment = action.payload.appointment;
        state.walkin = action.payload.walkin;
        state.isLoading = false;
      })
      .addCase(getBooking.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setStaff, setWalkin, setAppointment, setStaffService } = adminHomeSlice.actions;
export default adminHomeSlice.reducer;
