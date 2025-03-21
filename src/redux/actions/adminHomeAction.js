import { createAsyncThunk } from '@reduxjs/toolkit';
import { booking } from '@api/booking';
import { stores } from '@api/stores';
import { users } from '@api/users';

export const getBooking = createAsyncThunk('getBooking', async ({ storeId, today }) => {
  try {
    const response = await booking.getBooking(storeId, today);
    return response;
  } catch (error) {
    console.error('error adminHomeAction getBooking', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const addInvoice = createAsyncThunk('addInvoice', async ({ data }) => {
  try {
    const response = await booking.postInvoice(data);
    return response;
  } catch (error) {
    console.error('error adminHomeAction postInvoice', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const updateBooking = createAsyncThunk('updateBooking', async ({ service, type, staff }) => {
  try {
    const response = await booking.updateBooking({ service, type, staff });
    return response;
  } catch (error) {
    console.error('error adminHomeAction postInvoice', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const addSplitService = createAsyncThunk('addSplitService', async (data) => {
  try {
    const response = await booking.updateBooking(data);
    return response;
  } catch (error) {
    console.error('error adminHomeAction addSplitService', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const getSettings = createAsyncThunk('getSettings', async ({ storeId }) => {
  try {
    const response = await stores.getSettings(storeId);
    return response;
  } catch (error) {
    console.error('error adminHomeAction getSettings', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const uploadStoreImage = createAsyncThunk('uploadStoreImage', async ({ id, file, imageType }) => {
  try {
    const res = await users.uploadProfileImage(id, file, imageType);
    const newImage = { id: res[0].id, url: res[0].url };
    return { imageType, newImage };
  } catch (error) {
    console.error('error adminHomeAction uploadStoreImage', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const updateService = createAsyncThunk('updateService', async ({ ids, data, type }) => {
  try {
    let prevIds = ids;
    const prevId = data.id;
    const res = await stores.updateService(ids, data, type);
    if (type === 'service') {
      prevIds.serviceId = res.data.id;
    } else if (type === 'subService') {
      prevIds.subServiceId = res.data.id;
    } else if (type === 'items') {
      prevIds.itemId = res.data.id;
    }
    if (data.delete) return { ids: prevIds, data: { ...data, id: res.data.id }, type };
    return { ids: prevIds, data: { ...res.data.attributes, id: res.data.id }, type };
  } catch (error) {
    console.error('error adminHomeAction uploadStoreImage', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const updateEmployee = createAsyncThunk('updateEmployee', async ({ userId, id, data }) => {
  try {
    if (id === 'remove') {
      const res = await users.updateEmail(userId, data);
    } else {
      const res = await users.updateUser(id, data);
    }

    return { userId, data, id };
  } catch (error) {
    console.error('error staffAction updateEmployee', error);
    throw error;
  }
});
export const updateStoreInfo = createAsyncThunk('updateStoreInfo', async ({ storeId, data }) => {
  try {
    const res = await stores.updateStoreInfo(storeId, data);
    const { id, attributes } = res.data;
    return { ...attributes, id };
  } catch (error) {
    console.error('error staffAction updateStoreInfo', error);
    throw error;
  }
});
export const timeCard = createAsyncThunk('timeCard', async ({ data }) => {
  try {
    const res = await stores.timeCard(data);
    const { id, attributes } = res.data;
    return { ...attributes, id };
  } catch (error) {
    console.error('error staffAction timeCard', error);
    throw error;
  }
});

export const updateBookingService = createAsyncThunk('updateBookingService', async ({ id, services }) => {
  try {
    const res = await booking.updateBookingService(id, services);
    return res;
  } catch (error) {
    console.error('error  updateBookingService', error);
    console.error('error  updateBookingService2', error.message);
    throw error;
  }
});
