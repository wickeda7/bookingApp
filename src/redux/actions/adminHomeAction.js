import { createAsyncThunk } from '@reduxjs/toolkit';
import { booking } from '@api/booking';

export const getBooking = createAsyncThunk('getBooking', async ({ storeId, today }) => {
  try {
    const response = await booking.getBooking(storeId, today);
    return response;
  } catch (error) {
    console.log('error adminHomeAction getBooking', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const addInvoice = createAsyncThunk('addInvoice', async ({ data }) => {
  try {
    const response = await booking.postInvoice(data);
    return response;
  } catch (error) {
    console.log('error adminHomeAction postInvoice', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
