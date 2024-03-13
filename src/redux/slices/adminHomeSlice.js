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
      let service = action.payload.service;
      let type = action.payload.type;
      let staff = action.payload?.staff;

      let { specialist, status, bookingId, type: bookingType, id } = service;

      const available = status === 'pending' ? false : true;

      const bookingIndex = state[bookingType].findIndex((obj) => obj.id === bookingId);
      const booking = { ...state[bookingType][bookingIndex] };
      let bookingServices = booking.services;
      let bookingSpecialist = { ...booking.specialist };
      const specialistNum = bookingServices.filter((obj) => obj.specialist !== null).length;
      const serviceIndex = bookingServices.findIndex((obj) => obj.id === id);
      let serv = {};

      if (type === 'remove') {
        if (specialistNum === 1) {
          bookingSpecialist = null;
        }
        serv = { ...bookingServices[serviceIndex], specialist: null, status: 'pending' };
      } else {
        if (Object.keys(bookingSpecialist).length === 0) {
          bookingSpecialist = staff;
        }
        serv = { ...bookingServices[serviceIndex], specialist: staff, status: 'working' };
      }

      bookingServices[serviceIndex] = serv;

      state[bookingType][bookingIndex] = { ...booking, services: bookingServices, specialist: bookingSpecialist };

      const specialistId = specialist ? specialist.id : staff.id;
      const objectIndex = state.staff.findIndex((obj) => obj.id === specialistId);
      if (staff) {
        staff = { ...staff, available: false };
        state.staff.splice(objectIndex, 1);
        state.staff.push(staff);
      } else {
        if (specialistNum === 1) {
          state.staff[objectIndex].available = true;
        }
      }
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
