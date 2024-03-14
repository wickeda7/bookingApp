import { createSlice } from '@reduxjs/toolkit';
import { getBooking } from '../actions/adminHomeAction';
import { t } from 'i18next';
const initialState = {
  staffAvailable: [],
  staffUnAvailable: [],
  walkin: [],
  appointment: [],
  isLoading: false,
};

export const adminHomeSlice = createSlice({
  name: 'adminHome',
  initialState,
  reducers: {
    updatePrice: (state, action) => {
      let {
        text,
        item: { price, id, type: bookingType, bookingId },
      } = action.payload;
      let bookings = state[bookingType];
      const bookingIndex = bookings.findIndex((obj) => obj.id === bookingId);
      let booking = { ...bookings[bookingIndex] };
      let serviceIndex = booking.services.findIndex((obj) => obj.id === id);
      let service = { ...booking.services[serviceIndex] };
      let total = 0;
      if (text !== '') {
        console.log('text', +text);
        total = price * 100 + +text * 100;
        service = { ...service, additional: +text, total: total / 100 };
        booking.services[serviceIndex] = service;
        bookings[bookingIndex] = booking;
      }
      state[bookingType] = bookings;
    },
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

      if (staff) {
        const objectIndex = state.staffAvailable.findIndex((obj) => obj.id === staff.id);
        state.staffAvailable.splice(objectIndex, 1);
        state.staffUnAvailable.push(staff);
      } else {
        if (specialistNum === 1) {
          const objectIndex = state.staffUnAvailable.findIndex((obj) => obj.id === specialist.id);
          state.staffUnAvailable.splice(objectIndex, 1);
          state.staffAvailable.push(specialist);
        }
      }
    },
    setStaff: (state, action) => {
      state.staffAvailable = action.payload;
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

export const { setStaff, setWalkin, setAppointment, setStaffService, updatePrice } = adminHomeSlice.actions;
export default adminHomeSlice.reducer;
