import { createSlice } from '@reduxjs/toolkit';
import {
  addBooking,
  getUserBooking,
  getStaffBooking,
  notifyBooking,
  addInvoice,
  cancelBooking,
  getBookingById,
} from '../actions/bookingAction';
import { t } from 'i18next';
function tr(key) {
  return t(`homeScreen:${key}`);
}
const initialState = {
  bookingType: null,
  services: [],
  specialist: null,
  userBookings: [],
  bookingTime: null,
  isLoading: false,
  error: false,
  message: '',
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingType: (state, action) => {
      state.bookingType = action.payload;
    },
    resetMessage: (state) => {
      state.message = '';
    },
    updateUserBooking: (state, action) => {
      const userId = action.payload?.userId;
      const appointment = action.payload.data?.appointment;
      const type = action.payload.data?.type;
      if (type === 'confirmed') {
        const bookingId = action.payload.data.bookingId;
        const objectIndex = state.userBookings.findIndex((obj) => obj.id === bookingId);
        let booking = { ...state.userBookings[objectIndex] };
        booking.confirmed = true;
        state.userBookings[objectIndex] = booking;
        return;
      }
      if (type === 'cancel') {
        const bookingId = action.payload.data.bookingId;
        const objectIndex = state.userBookings.findIndex((obj) => obj.id === bookingId);
        let booking = { ...state.userBookings[objectIndex] };
        booking.canceled = true;
        state.userBookings[objectIndex] = booking;
        return;
      }
      if (appointment) {
        const objectIndex = state.userBookings.findIndex((obj) => obj.id === appointment);
        state.userBookings.splice(objectIndex, 1);
        return;
      }
    },
    setServices: (state, action) => {
      const item = action.payload;
      let map = state.services.reduce((acc, obj, idx) => acc.set(obj.id, idx), new Map());
      if (map.has(item.id)) {
        let idx = map.get(item.id);
        state.services.splice(idx, 1);
      } else {
        state.services.push({ ...item, selected: true });
      }
    },
    setSpecialist: (state, action) => {
      state.specialist = action.payload;
    },
    setBookingTime: (state, action) => {
      state.bookingTime = action.payload;
    },
    resetState: (state) => {
      state.bookingType = null;
      state.services = [];
      state.specialist = null;
      state.bookingTime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.isLoading = false;

        state.status = action.payload;
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(getUserBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBookings = action.payload;
      })
      .addCase(getUserBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(notifyBooking.pending, (state) => {})
      .addCase(notifyBooking.fulfilled, (state, action) => {
        const data = action.payload;
        const { bookingId } = data[0];
        const bookingIndex = state.userBookings.findIndex((obj) => obj.id === bookingId);
        let booking = { ...state.userBookings[bookingIndex] };
        let sub = 0;
        let addition = 0;
        let tot = 0;
        for (var value of data) {
          if (value.price) sub += value.price;
          if (value.additional) addition += value.additional;
        }
        tot = sub + addition;
        state.userBookings[bookingIndex] = {
          ...booking,
          services: JSON.stringify(data),
          subtotal: sub,
          additional: addition,
          total: tot,
        };
      })
      .addCase(notifyBooking.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.message = t('adminHomeScreen:invoiceCreated');
        state.isLoading = false;
        const bookingId = action.payload.appointment;
        const objectIndex = state.userBookings.findIndex((obj) => obj.id === bookingId);
        state.userBookings.splice(objectIndex, 1);
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(cancelBooking.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        // state.isLoading = false;
        const bookingId = action.payload.id;
        const objectIndex = state.userBookings.findIndex((obj) => obj.id === bookingId);
        state.userBookings.splice(objectIndex, 1);
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        //state.isLoading = false;
        // state.error = true;
      })
      .addCase(getBookingById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        const type = action.payload.type;
        const userId = action.payload.userId;
        let { date, id, services, timeslot } = action.payload.data;
        services = typeof services === 'string' ? JSON.parse(services) : services;
        const index = state.userBookings.findIndex((item) => item.id === id);
        if (type === 'remove') {
          const items = services.filter((item) => item.specialistID === userId);
          if (items.length > 0) {
            if (index === -1) {
              const { callBack, client, date, specialistID, specialist, storeID, timeslot, userID } = items[0];
              const data = {
                id,
                callBack,
                client,
                date,
                services: items,
                specialistID,
                specialists: [specialist],
                timeslot,
                storeID,
                userID,
              };
              state.userBookings.push(data);
            } else {
              state.userBookings[index].services = items;
            }
          } else {
            state.userBookings.splice(index, 1);
          }
        } else {
          if (index !== -1) {
            state.userBookings[index] = action.payload.data;
          } else {
            state.userBookings.push(action.payload.data);
          }
        }

        state.isLoading = false;
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.isLoading = false;
        //state.error = true;
      })
      .addCase(getStaffBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStaffBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBookings = action.payload;
      })
      .addCase(getStaffBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});
export const {
  setBookingType,
  setServices,
  setSpecialist,
  setBookingTime,
  resetState,
  updateUserBooking,
  resetMessage,
} = bookingSlice.actions;

export default bookingSlice.reducer;
