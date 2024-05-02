import { createAsyncThunk } from '@reduxjs/toolkit';
import { batches } from '@api/batches';

export const getInvoicesByDate = createAsyncThunk('getInvoicesByDate', async ({ storeId, date }) => {
  try {
    const response = await batches.getInvoicesByDate(storeId, date);
    return response;
  } catch (error) {
    console.log('error batchesAction getInvoicesByDate', error.response.data.error.message);
    throw error.response.data.error.message;
  }
});
