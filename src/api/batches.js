import { batchApi } from './batchesApi';

export const batches = {
  getInvoicesByDate: async (storeId, date) => {
    try {
      const response = await batchApi.getInvoicesByDate(storeId, date);
      // console.log('response batches getInvoicesByDate: ', response);
      return response;
    } catch (error) {
      console.error('Error batches getInvoicesByDate: ', error);
      throw error;
    }
  },
};
