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
};
