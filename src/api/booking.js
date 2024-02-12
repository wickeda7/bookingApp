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
  getUserBooking: async (id, done) => {
    try {
      const response = await api.getUserBooking(id, done);
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
};
