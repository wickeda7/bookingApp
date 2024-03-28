import { createSlice } from '@reduxjs/toolkit';
import { getBooking, addInvoice, updateBooking, addSplitService } from '../actions/adminHomeAction';
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
    updateAppointment: (state, action) => {
      const type = action.payload?.type;
      if (type === 'cancel') {
        const bookingId = action.payload.bookingId;
        const timeslot = action.payload.timeslot;
        const bookingType = timeslot === null ? 'walkin' : 'appointment';
        const bookingIndex = state[bookingType].findIndex((obj) => obj.id === bookingId);
        state[bookingType][bookingIndex] = { ...state[bookingType][bookingIndex], canceled: true };
        return;
      }

      const { id, confirmed } = action.payload;
      const appointment = state.appointment.map((obj) => {
        if (obj.id === id) {
          return { ...obj, confirmed: confirmed };
        }
        return obj;
      });
      state.appointment = appointment;
    },
    resetMessage: (state) => {
      const keys = Object.keys(state.invoice);
      const invoice = state.invoice[keys[0]];
      state.message = '';
      if (invoice) {
        let bookings = state[invoice.type];
        const bookingIndex = bookings.findIndex((obj) => obj.id === invoice.appointment);
        let booking = { ...bookings[bookingIndex] };
        const specialistNum = booking.services.filter((obj) => obj.specialistID !== invoice.specialist);
        if (specialistNum.length === 0) {
          bookings.splice(bookingIndex, 1);
        } else {
          booking = { ...booking, services: specialistNum };
          bookings[bookingIndex] = booking;
          state[invoice.type] = bookings;
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
    updateNotification: (state, action) => {
      const data = action.payload;
      const { bookingId, timeslot, specialist, id } = data;
      const bookingType = timeslot === null ? 'walkin' : 'appointment';
      let bookings = state[bookingType];
      const bookingIndex = bookings.findIndex((obj) => obj.id === bookingId);
      let booking = { ...bookings[bookingIndex] };
      let services = booking.services.map((obj) => {
        if (obj.id === id) {
          return { ...obj, ...data };
        }
        return obj;
      });

      booking = { ...booking, alert: true, services };
      bookings[bookingIndex] = booking;
      state[bookingType] = bookings;
    },

    updatePrice: (state, action) => {
      let {
        value,
        item: { price, id, timeslot, bookingId },
        field,
      } = action.payload;
      const bookingType = timeslot === null ? 'walkin' : 'appointment';
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
        } else if (field === 'price') {
          service = { ...service, price: +value, total: +value };
        } else {
          service = { ...service, notes: value };
        }

        booking.services[serviceIndex] = service;
        bookings[bookingIndex] = booking;
      }
      state[bookingType] = bookings;
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
    },
    setWalkin: (state, action) => {
      state.walkin = [action.payload, ...state.walkin];
    },
    setAppointment: (state, action) => {
      state.appointment = [action.payload, ...state.appointment];
    },
    updateNewInvoice: (state, action) => {
      const { appointment, specialist, type, store } = action.payload;
      let bookings = state[type];
      const bookingIndex = bookings.findIndex((obj) => obj.id === appointment);
      let booking = { ...bookings[bookingIndex] };
      const specialistNum = booking.services.filter((obj) => obj.specialistID !== specialist);
      if (specialistNum.length === 0) {
        bookings.splice(bookingIndex, 1);
      } else {
        booking = { ...booking, services: specialistNum };
        bookings[bookingIndex] = booking;
        state[type] = bookings;
      }
      const objectIndex = state.staffUnAvailable.findIndex((obj) => obj.id === specialist);
      const staff = state.staffUnAvailable[objectIndex];
      state.staffUnAvailable.splice(objectIndex, 1);
      state.staffAvailable.push(staff);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        const unavailableStaff = action.payload.unavailableStaff;
        if (unavailableStaff.length > 0) {
          unavailableStaff.forEach((obj) => {
            const objectIndex = state.staffAvailable.findIndex((staff) => staff.id === obj);
            const staff = state.staffAvailable[objectIndex];
            state.staffAvailable.splice(objectIndex, 1);
            state.staffUnAvailable.push(staff);
          });
        }

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
      })
      .addCase(updateBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const { id, services, timeslot, specialists, date, specialistID, callBack, storeID, userID, client, removeId } =
          action.payload;

        const bookingType = timeslot === null ? 'walkin' : 'appointment';
        const bookingIndex = state[bookingType].findIndex((obj) => obj.id === id);
        const booking = { ...state[bookingType][bookingIndex] };
        const pServices = typeof services === 'object' ? services : JSON.parse(services);
        const bSpecialistId = booking.specialistID;

        const newId = bSpecialistId ? bSpecialistId : specialistID;

        if (removeId) {
          const objectIndex = state.staffUnAvailable.findIndex((staff) => staff.id === removeId);
          if (objectIndex !== -1) {
            const staff = state.staffUnAvailable[objectIndex];
            state.staffUnAvailable.splice(objectIndex, 1);
            state.staffAvailable.push(staff);
          }
          state[bookingType][bookingIndex] = {
            ...booking,
            specialistID: null,
            services: pServices,
            specialist: specialists[0],
          };
        } else {
          state[bookingType][bookingIndex] = {
            ...booking,
            specialistID: newId,
            services: pServices,
            specialist: specialists[0],
          };
        }

        state.isLoading = false;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(addSplitService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSplitService.fulfilled, (state, action) => {
        const { id, timeslot } = action.payload;
        const bookingType = timeslot === null ? 'walkin' : 'appointment';
        let bookings = state[bookingType];
        const bookingIndex = bookings.findIndex((obj) => obj.id === id);
        bookings[bookingIndex] = action.payload;
        state[bookingType] = bookings;
        state.isLoading = false;
      })
      .addCase(addSplitService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const {
  setStaff,
  setWalkin,
  setAppointment,
  updateStaff,
  updatePrice,
  resetMessage,
  addBooking,
  updateAppointment,
  updateNotification,
  updateNewInvoice,
} = adminHomeSlice.actions;
export default adminHomeSlice.reducer;
