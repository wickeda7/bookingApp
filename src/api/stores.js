import { api } from '@api/api';
import { DATA } from './tempData';
import { parseReduceData } from '@utils/helper';
export const stores = {
  getData: async (favorites, county, type) => {
    try {
      const response = await api.getStores(county, type);
      const res = response.data.reduce((acc, item) => {
        const fovarite = favorites?.find((fav) => fav.id === item.id);
        if (fovarite) {
          item['selected'] = true;
        }

        item['logo'] = `${item.logo.url}`;
        item['location'] = `${item.address} ${item.city}, ${item.state} ${item.zip}`;
        acc.push(item);
        return acc;
      }, []);
      return [...res, ...DATA];
    } catch (error) {
      throw error;
    }
  },
  getStoreById: async (id) => {
    try {
      const response = await api.getStoreById(id);
      const res = {
        images: response.images,
        services: response.services,
        employee: response.employee,
      };
      return res;
    } catch (error) {
      console.log('error getStoreById', error);
      throw error;
    }
  },
  getReviews: async (id) => {
    try {
      const response = await api.getStoreReviews(id);
      return response;
    } catch (error) {
      console.log('error getReviews', error);
      throw error;
    }
  },
  getSettings: async (storeId) => {
    try {
      const response = await api.getStoreSettings(storeId);
      return response;
    } catch (error) {
      console.log('error getSettings', error);
      throw error;
    }
  },
  updateService: async (ids, data, type) => {
    try {
      const response = await api.updateService(ids, data, type);
      return response;
    } catch (error) {
      console.log('error updateService', error);
      throw error;
    }
  },
  updateStoreInfo: async (id, data) => {
    try {
      const response = await api.updateStoreInfo(id, data);
      return response;
    } catch (error) {
      console.log('error updateStoreInfo', error);
      throw error;
    }
  },
  timeCard: async (data) => {
    try {
      const id = data.timeCardId;
      if (id) {
        delete data.timeCardId;
        delete data.userId;
        delete data.storeId;
        delete data.date;
        delete data.in;
      }
      const response = await api.timeCard(id, data);
      return response;
    } catch (error) {
      console.log('error timeCard', error);
      throw error;
    }
  },
};
