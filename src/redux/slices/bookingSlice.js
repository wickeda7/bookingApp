import { createSlice } from '@reduxjs/toolkit';
import { addBooking } from '../actions/bookingAction';

const initialState = {
  bookingType: null,
  services: [],
  specialist: {},
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
      });
  },
});
export const { setBookingType, setServices, setSpecialist, setBookingTime, resetState } = bookingSlice.actions;

export default bookingSlice.reducer;
