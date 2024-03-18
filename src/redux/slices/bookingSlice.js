import { createSlice } from '@reduxjs/toolkit';
import { addBooking, getUserBooking } from '../actions/bookingAction';

const initialState = {
  bookingType: null,
  services: [],
  specialist: {},
  userBookings: [],
  bookingTime: null,
  isLoading: false,
  error: false,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingType: (state, action) => {
      state.bookingType = action.payload;
    },
    updateUserBooking: (state, action) => {
      const userId = action.payload.userId;
      const { date, id, services, timeslot } = action.payload.data;

      const items = services.filter((item) => item.specialistID === userId);
      const index = state.userBookings.findIndex((item) => item.id === id);
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
            specialists: specialist,
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
      state.specialist = {};
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
      });
  },
});
export const { setBookingType, setServices, setSpecialist, setBookingTime, resetState, updateUserBooking } =
  bookingSlice.actions;

export default bookingSlice.reducer;
