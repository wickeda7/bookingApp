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
    const { id, done, type } = data;
    const response = await booking.getUserBooking(id, done, type);
    return response.data;
  } catch (error) {
    console.log('error bookingAction getUserBooking', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const notifyBooking = createAsyncThunk('notifyBooking', async (data) => {
  try {
    const response = await booking.notifyBooking(data);
    return data;
  } catch (error) {
    console.log('error bookingAction notifyBooking', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const addInvoice = createAsyncThunk('addInvoice', async ({ data }) => {
  try {
    const response = await booking.postInvoice(data);
    return response;
  } catch (error) {
    console.log('error bookingAction postInvoice', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const cancelBooking = createAsyncThunk('cancelBooking', async ({ id }) => {
  try {
    const response = await booking.deleteHistory(id);
    return response;
  } catch (error) {
    console.log('error bookingAction cancelBooking', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
