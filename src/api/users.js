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
  getReviews: async (id) => {
    try {
      const response = await api.getSpecialistReviews(id);
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateEmail: async (id, data) => {
    try {
      const response = await api.updateEmail(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (id, data) => {
    try {
      const response = await api.updateUser(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  createStaff: async (data) => {
    try {
      delete data.images;
      delete data.profileImg;
      if (data.experience === '') delete data.experience;
      const response = await api.createStaff(data);
      const { id, attributes } = response.data;
      return { ...attributes, id };
    } catch (error) {
      console.log('error createStaff', error);
      throw error;
    }
  },
  uploadProfileImage: async (id, file, type) => {
    try {
      const response = await api.uploadProfileImage(id, file, type);
      return response;
    } catch (error) {
      console.log('error uploadProfileImage', error);
      throw error;
    }
  },
  deleteImage: async (id) => {
    try {
      const response = await api.deleteImage(id);
      return response;
    } catch (error) {
      console.log('error deleteImage', error);
      throw error;
    }
  },
};
