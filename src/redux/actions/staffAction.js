import { createAsyncThunk } from '@reduxjs/toolkit';
import { stores } from '@api/stores';
import { users } from '@api/users';

export const getStoreById = createAsyncThunk('getStoreById', async (id) => {
  try {
    const { employee } = await stores.getStoreById(id);
    return employee;
  } catch (error) {
    console.log('error staffAction getStoreById', error);
    throw error;
  }
});
export const unverifiedStaff = createAsyncThunk('unverifiedStaff', async (id) => {
  try {
    const res = await users.unverifiedStaff(id);
    return res;
  } catch (error) {
    console.log('error staffAction getStoreById', error);
    throw error;
  }
});
export const updateUser = createAsyncThunk('updateUser', async ({ userId, id, data }) => {
  try {
    const res = await users.updateUser(id, data);
    return { userId, data, id };
  } catch (error) {
    console.log('error staffAction updateUser', error);
    throw error;
  }
});
export const updateEmail = createAsyncThunk('updateEmail', async ({ id, data }) => {
  try {
    const res = await users.updateEmail(id, data);
    return { id, data };
  } catch (error) {
    console.log('error staffAction updateEmail', error);
    throw error;
  }
});
export const uploadImage = createAsyncThunk('uploadImage', async ({ id, file, imageType, userId }) => {
  try {
    const res = await users.uploadProfileImage(id, file, imageType);
    const newImage = { id: res[0].id, url: res[0].url };
    return { imageType, newImage, userId };
  } catch (error) {
    console.log('error staffAction uploadImage', error);
    throw error;
  }
});
export const deleteStaff = createAsyncThunk('deleteStaff', async ({ ids, type }) => {
  try {
    const res = await users.deleteStaff(ids, type);
    //const newImage = { id: res[0].id, url: res[0].url };
    return { type, ids };
  } catch (error) {
    console.log('error staffAction deleteStaff', error);
    throw error;
  }
});
