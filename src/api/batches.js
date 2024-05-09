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
  getServiceItems: async (storeId) => {
    try {
      const response = await batchApi.getServiceItems(storeId);
      const res = response.data.reduce((acc, service) => {
        const { id, attributes } = service;
        acc.push({
          id,
          ...attributes,
        });
        return acc;
      }, []);
      return res;
    } catch (error) {
      console.error('Error batches getServiceItems: ', error);
      throw error;
    }
  },
};
