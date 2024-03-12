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
      // console.log('adminHomeSlice -> setStaffService -> service', service);
      // console.log('adminHomeSlice -> setStaffService -> staff', staff);

      let { specialist, status, bookingId, type: bookingType, id } = service;
      console.log('adminHomeSlice -> setStaffService -> specialist', specialist);
      console.log('adminHomeSlice -> setStaffService -> status', status);
      console.log('adminHomeSlice -> setStaffService -> bookingId', bookingId);
      console.log('adminHomeSlice -> setStaffService -> type', bookingType);
      console.log('adminHomeSlice -> setStaffService -> id', id);
      const available = status === 'pending' ? false : true;
      const newStatus = status === 'pending' ? 'working' : 'pending';
      if (type === 'remove') {
        const objectIndex = state.staff.findIndex((obj) => obj.id === specialist.id);
        const isAvailable = state.staff[objectIndex].available;
        if (!isAvailable) {
          specialist = { ...specialist, available: true };
          state.staff.splice(objectIndex, 1);
          state.staff.push(specialist);
        }

        const bookingIndex = state[bookingType].findIndex((obj) => obj.id === bookingId);
        const booking = { ...state[bookingType][bookingIndex] };
        let bookingServices = booking.services;
        let bookingSpecialist = { ...booking.specialist };
        const serviceIndex = bookingServices.findIndex((obj) => obj.id === id);
        const specialistNum = bookingServices.filter((obj) => obj.specialist !== null).length;
        if (specialistNum === 1) {
          bookingSpecialist = null;
        }
        let serv = { ...bookingServices[serviceIndex], specialist: null, status: 'pending' };
        bookingServices[serviceIndex] = serv;
        state[bookingType][bookingIndex] = { ...booking, services: bookingServices, specialist: bookingSpecialist };
      } else {
        const objectIndex = state.staff.findIndex((obj) => obj.id === staff.id);
        const isAvailable = state.staff[objectIndex].available;
        console.log('adminHomeSlice -> setStaffService -> isAvailable', isAvailable);
        if (isAvailable) {
          staff = { ...staff, available: false };
          state.staff.splice(objectIndex, 1);
          state.staff.push(staff);
        }

        const bookingIndex = state[bookingType].findIndex((obj) => obj.id === bookingId);
        const booking = { ...state[bookingType][bookingIndex] };
        let bookingServices = booking.services;
        let bookingSpecialist = { ...booking.specialist };
        console.log('adminHomeSlice -> setStaffService -> bookingSpecialist', bookingSpecialist);
        const serviceIndex = bookingServices.findIndex((obj) => obj.id === id);
        const specialistNum = bookingServices.filter((obj) => obj.specialist !== null).length;
        // if (specialistNum === 1) {
        //   bookingSpecialist = null;
        // }
        let serv = { ...bookingServices[serviceIndex], specialist: staff, status: 'working' };
        bookingServices[serviceIndex] = serv;
        state[bookingType][bookingIndex] = { ...booking, services: bookingServices, specialist: bookingSpecialist };
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
