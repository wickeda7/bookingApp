import { api } from '@api/api';
import { DATA } from './tempData';
import { STRAPIURL } from '@env';
import { parseReduceData } from '@utils/helper';
export const stores = {
  getData: async (favorites) => {
    try {
      const response = await api.getStores();
      const res = response.data.reduce((acc, item) => {
        let attributes = item.attributes;
        attributes['id'] = item.id;
        const fovarite = favorites?.find((fav) => fav.id === item.id);
        if (fovarite) {
          attributes['selected'] = true;
        }

        attributes.logo = `${STRAPIURL}${item.attributes.logo.data.attributes.url}`;
        attributes[
          'location'
        ] = `${item.attributes.address} ${item.attributes.city}, ${item.attributes.state} ${item.attributes.zip}`;
        acc.push(attributes);
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
      throw error;
    }
  },
  getReviews: async (id) => {
    try {
      const response = await api.getStoreReviews(id);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
