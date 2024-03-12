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
      let { item, type } = action.payload;
      if (type === 'staff') {
        let { specialist, status, bookingId, type: bookingType, id } = item;
        const available = status === 'pending' ? false : true;
        const newStatus = status === 'pending' ? 'working' : 'pending';
        specialist = { ...specialist, available };
        const objectIndex = state.staff.findIndex((obj) => obj.id === specialist.id);
        state.staff.splice(objectIndex, 1);
        state.staff.push(specialist);

        let booking = state[bookingType].map((obj) => {
          if (obj.id === bookingId) {
            console.log('services', obj.services);
            console.log('services id', id);
            console.log('services length', obj.services.length);
            console.log('services status', status);
            let services = obj.services.map((obj) => {
              if (obj.id === id) {
                let prevSpecialist = status === 'pending' ? obj.specialist : null;
                return { ...obj, status: newStatus, specialist: prevSpecialist };
              }
              return obj;
            });
            let prevSpecialist = status === 'pending' ? obj.specialist : null;
            return { ...obj, services: services, specialist: prevSpecialist };
          }
          return obj;
        });
        state[bookingType] = booking;
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
