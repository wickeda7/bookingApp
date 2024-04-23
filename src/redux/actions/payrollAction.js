import { createAsyncThunk } from '@reduxjs/toolkit';
import { payroll } from '@api/payroll';

export const getPayrollData = createAsyncThunk('getPayrollData', async ({ storeId, startDate, endDate }) => {
  try {
    const response = await payroll.getPayrollData(storeId, startDate, endDate);
    return response.data;
  } catch (error) {
    console.log('error payrollAction getPayrollData', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const getStaffPayrollData = createAsyncThunk('getStaffPayrollData', async ({ storeId, payrollId, userId }) => {
  try {
    const response = await payroll.getStaffPayrollData(storeId, payrollId, userId);
    return response;
  } catch (error) {
    console.log('error payrollAction getPayrollData', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const createPayroll = createAsyncThunk('createPayroll', async (data) => {
  try {
    const response = await payroll.createPayroll(data);
    return response;
  } catch (error) {
    console.log('error payrollAction createPayroll', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
export const updatePayroll = createAsyncThunk('updatePayroll', async ({ payrollId, data }) => {
  try {
    const response = await payroll.updatePayroll(payrollId, data);
    return response;
  } catch (error) {
    console.log('error payrollAction createPayroll', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
