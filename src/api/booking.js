import { api } from '@api/api';
export const booking = {
  post: async (data) => {
    try {
      const response = await api.postBooking(data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getSpecialistBooking: async (ids) => {
    try {
      const response = await api.getSpecialistBooking(ids);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getUserBooking: async (id, done, type) => {
    try {
      const response = await api.getUserBooking(id, done, type);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteHistory: async (id) => {
    try {
      const response = await api.deleteHistory(id);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getStoreBooking: async (storeId, userId) => {
    try {
      const response = await api.getStoreBooking(storeId, userId);
      const res = response.reduce((acc, item) => {
        const { id, attributes } = item;
        return [...acc, { ...attributes, id }];
      }, []);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
