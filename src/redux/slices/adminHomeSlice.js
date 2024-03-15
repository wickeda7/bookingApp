import { createSlice } from '@reduxjs/toolkit';
import { getBooking, addInvoice } from '../actions/adminHomeAction';
import { t } from 'i18next';
const initialState = {
  staffAvailable: [],
  staffUnAvailable: [],
  walkin: [],
  appointment: [],
  isLoading: false,
  message: '',
  invoice: {},
};
function tr(key) {
  return t(`homeScreen:${key}`);
}

export const adminHomeSlice = createSlice({
  name: 'adminHome',
  initialState,
  reducers: {
    resetMessage: (state) => {
      const keys = Object.keys(state.invoice);
      const invoice = state.invoice[keys[0]];
      state.message = '';
      if (invoice) {
        const bookingIndex = state[invoice.type].findIndex((obj) => obj.id === invoice.appointment);
        if (bookingIndex !== -1) {
          state[invoice.type].splice(bookingIndex, 1);
        }
        const objectIndex = state.staffUnAvailable.findIndex((obj) => obj.id === invoice.specialist);
        if (objectIndex !== -1) {
          const staff = state.staffUnAvailable[objectIndex];
          state.staffUnAvailable.splice(objectIndex, 1);
          state.staffAvailable.push(staff);
        }
        delete state.invoice[keys[0]];
      }
    },
    updatePrice: (state, action) => {
      let {
        value,
        item: { price, id, type: bookingType, bookingId },
        field,
      } = action.payload;
      let bookings = state[bookingType];
      const bookingIndex = bookings.findIndex((obj) => obj.id === bookingId);
      let booking = { ...bookings[bookingIndex] };
      let serviceIndex = booking.services.findIndex((obj) => obj.id === id);
      let service = { ...booking.services[serviceIndex] };
      let total = 0;
      if (value !== '') {
        if (field === 'additional') {
          total = price * 100 + +value * 100;
          service = { ...service, additional: +value, total: total / 100 };
        } else {
          service = { ...service, notes: value };
        }

        booking.services[serviceIndex] = service;
        bookings[bookingIndex] = booking;
      }
      state[bookingType] = bookings;
    },

    updateService: (state, action) => {
      let service = action.payload.service;
      let type = action.payload.type;
      let staff = action.payload?.staff;

      let { specialist, status, bookingId, type: bookingType, id } = service;

      const bookingIndex = state[bookingType].findIndex((obj) => obj.id === bookingId);
      const booking = { ...state[bookingType][bookingIndex] };
      let bookingServices = booking.services;
      let bookingSpecialist = { ...booking.specialist };
      const specialistNum = bookingServices.filter((obj) => obj.specialist !== null);
      const serviceIndex = bookingServices.findIndex((obj) => obj.id === id);
      let serv = {};
      if (type === 'remove') {
        if (specialistNum.length === 1) {
          bookingSpecialist = null;
        } else {
          const temp = specialistNum.filter((obj) => obj.specialist.id !== specialist.id);
          if (temp.length > 0) {
            bookingSpecialist = temp[0].specialist;
          }
        }
        serv = { ...bookingServices[serviceIndex], specialist: null, status: 'pending' };
        bookingServices[serviceIndex] = serv;
        state[bookingType][bookingIndex] = { ...booking, services: bookingServices, specialist: bookingSpecialist };
      } else {
        // if specialist is already assigned it request by user
        // if specialist is null then assign the user
        const assign = specialist === null ? staff : specialist;

        if (
          (bookingServices.length > 1 && specialistNum.length === 0) ||
          bookingServices.length === specialistNum.length
        ) {
          const temp = bookingServices.reduce((acc, obj) => {
            return [...acc, { ...obj, specialist: assign, status: 'working' }];
          }, []);
          state[bookingType][bookingIndex] = { ...booking, services: temp, specialist: assign };
        } else {
          serv = { ...bookingServices[serviceIndex], specialist: assign, status: 'working' };
          bookingServices[serviceIndex] = serv;
          state[bookingType][bookingIndex] = {
            ...booking,
            services: bookingServices,
            specialist: assign,
          };
        }
      }
    },
    updateStaff: (state, action) => {
      if (action.payload.userInfo) {
        const { userInfo, id } = action.payload;
        const objectIndex = state.staffAvailable.findIndex((obj) => obj.id === id);
        state.staffAvailable.splice(objectIndex, 1);
        state.staffUnAvailable.push(action.payload);
      } else {
        const { bookingId, type, specialist } = action.payload;
        const booking = state[type].find((obj) => obj.id === bookingId);
        const specialistNum = booking.services.filter((obj) => {
          if (obj.specialist && obj.specialist.id === specialist.id) {
            return obj;
          }
        });
        if (specialistNum.length === 0) {
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
      })
      .addCase(addInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.message = t('adminHomeScreen:invoiceCreated');
        state.isLoading = false;
        state.invoice = { ...state.invoice, [action.payload.specialist]: action.payload };
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const { setStaff, setWalkin, setAppointment, updateService, updateStaff, updatePrice, resetMessage } =
  adminHomeSlice.actions;
export default adminHomeSlice.reducer;
