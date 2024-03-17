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
export const getUserBooking = createAsyncThunk('getUserBooking', async (data) => {
  try {
    console.log('data createAsyncThunk', data);
    const { id, done, type } = data;
    const response = await booking.getUserBooking(id, done, type);
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.log('error bookingAction getUserBooking', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
