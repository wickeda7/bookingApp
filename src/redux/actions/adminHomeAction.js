import { createAsyncThunk } from '@reduxjs/toolkit';
import { booking } from '@api/booking';
import { stores } from '@api/stores';
import { users } from '@api/users';

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
export const updateBooking = createAsyncThunk('updateBooking', async ({ service, type, staff }) => {
  try {
    const response = await booking.updateBooking({ service, type, staff });
    return response;
  } catch (error) {
    console.log('error adminHomeAction postInvoice', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const addSplitService = createAsyncThunk('addSplitService', async (data) => {
  try {
    const response = await booking.updateBooking(data);
    return response;
  } catch (error) {
    console.log('error adminHomeAction addSplitService', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const getSettings = createAsyncThunk('getSettings', async ({ storeId }) => {
  try {
    const response = await stores.getSettings(storeId);
    return response;
  } catch (error) {
    console.log('error adminHomeAction getSettings', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const uploadStoreImage = createAsyncThunk('uploadStoreImage', async ({ id, file, imageType }) => {
  try {
    const res = await users.uploadProfileImage(id, file, imageType);
    const newImage = { id: res[0].id, url: res[0].url };
    return { imageType, newImage };
  } catch (error) {
    console.log('error adminHomeAction uploadStoreImage', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const updateService = createAsyncThunk('updateService', async ({ ids, data, type }) => {
  try {
    let prevIds = ids;
    const res = await stores.updateService(ids, data, type);
    if (type === 'service') {
      prevIds.serviceId = prevIds.serviceId === 'new' ? res.data.id : prevIds.serviceId;
    } else if (type === 'subService') {
      prevIds.subServiceId = prevIds.subServiceId === 'new' ? res.data.id : prevIds.subServiceId;
    }
    console.log('updateService res', res.data.id, prevIds);

    return { ids: prevIds, data: { ...res.data.attributes, id: res.data.id }, type };
  } catch (error) {
    console.log('error adminHomeAction uploadStoreImage', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
