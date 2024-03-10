import { createAsyncThunk } from '@reduxjs/toolkit';
import { booking } from '@api/booking';

export const getWalkIn = createAsyncThunk('getWalkIn', async ({ storeId, today }) => {
  try {
    const response = await booking.getWalkIn(storeId, today);
    return response;
  } catch (error) {
    console.log('error adminHomeAction getWalkIn', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
