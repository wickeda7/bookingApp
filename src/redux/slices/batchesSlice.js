import { createSlice } from '@reduxjs/toolkit';
import { getInvoicesByDate } from '../actions/batchesAction';

const initialState = { batches: null, serviceItems: null, isLoading: false };

export const batchesSlice = createSlice({
  name: 'batches',
  initialState,
  reducers: {
    setBatches: (state, action) => {
      state.batches = action.payload;
    },
    setServiceItems: (state, action) => {
      state.serviceItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvoicesByDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvoicesByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.batches = action.payload;
      })
      .addCase(getInvoicesByDate.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const { setBatches, setServiceItems } = batchesSlice.actions;
export default batchesSlice.reducer;
