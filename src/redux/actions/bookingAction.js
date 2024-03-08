import { createAsyncThunk } from '@reduxjs/toolkit';
import { booking } from '@api/booking';

export const addBooking = createAsyncThunk('addBooking', async ({ data }) => {
  try {
    const response = await booking.post({ data });
    return response.data;
  } catch (error) {
    console.log('error bookingAction addBooking', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
