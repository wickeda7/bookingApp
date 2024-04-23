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
  unverifiedStaff: async (id) => {
    try {
      const response = await api.unverifiedStaff(id);
      let data = [];
      if (response.data.length > 0) {
        data = response.data.map((item) => {
          return {
            ...item.attributes,
            id: item.id,
          };
        });
      }
      return data;
    } catch (error) {
      console.log('error unverifiedStaff', error);
      throw error;
    }
  },

  createAccessCode: async ({ data, method }) => {
    try {
      const response = await api.createAccessCode({ data, method });
      const { id, attributes } = response.data;
      return { ...attributes, id };
    } catch (error) {
      console.log('error createAccessCode', error);
      throw error;
    }
  },
  getAccessCode: async (userId, code) => {
    try {
      const response = await api.getAccessCode(userId, code);
      return response;
    } catch (error) {
      console.log('error getAccessCode', error);
      throw error;
    }
  },
  sendCode: async (item) => {
    let data = { ...item };
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    try {
      const response = await api.sendCode(data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateToken: async (id, token) => {
    try {
      const response = await api.updateToken(id, token);
      return response;
    } catch (error) {
      console.log('error updateToken', error);
      throw error;
    }
  },
};
