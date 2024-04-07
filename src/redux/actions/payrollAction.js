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
