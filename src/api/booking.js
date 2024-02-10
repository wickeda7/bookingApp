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
};
