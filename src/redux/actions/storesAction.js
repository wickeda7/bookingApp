import { createAsyncThunk } from '@reduxjs/toolkit';
import { stores } from '@api/stores';
import { booking } from '@api/booking';

export const getStores = createAsyncThunk('getStores', async ({ favorites, county, type }) => {
  try {
    const response = await stores.getData(favorites, county, type);
    return response;
  } catch (error) {
    console.log('error storesAction getStores', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const getStoreRelation = createAsyncThunk('getStoreRelation', async ({ storeId }) => {
  try {
    const response = await stores.getStoreById(storeId);
    return { data: response, storeId };
  } catch (error) {
    console.log('error storesAction getStoreRelation', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const getReviews = createAsyncThunk('getReviews', async ({ storeId }) => {
  try {
    const response = await stores.getReviews(storeId);
    return response;
  } catch (error) {
    console.log('error storesAction getStoreRelation', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const getStoreBooking = createAsyncThunk('getStoreBooking', async ({ storeId }) => {
  try {
    const response = await booking.getStoreBooking(storeId);
    return response;
  } catch (error) {
    console.log('error storesAction getStoreBooking', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
