import { api } from '@api/api';

export const users = {
  getUser: async (email) => {
    try {
      const response = await api.getUser(email);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateFavorite: async (id, store) => {
    if (store.selected) {
      const data = {
        favorites: {
          connect: [store.id],
        },
      };
      await api.putFavorite(id, data);
      return;
    } else {
      const data = {
        favorites: {
          disconnect: [store.id],
        },
      };
      await api.putFavorite(id, data);
      return;
    }
  },
  register: async (data) => {
    try {
      const response = await api.register(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
