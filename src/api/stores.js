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
      const { attributes } = response;
      const images = attributes.images.data;
      const services = attributes.services.data.reduce((acc, serv) => {
        const service = {};
        const { id, attributes } = serv;
        if (attributes.enable) {
          service['id'] = id;
          service['name'] = attributes.name;
          if (attributes.items.data.length > 0) {
            service['items'] = parseReduceData(attributes.items.data);
          }
          if (attributes.sub_services.data.length > 0) {
            const tempSub = attributes.sub_services.data.reduce((acc, sub) => {
              const { id, attributes } = sub;
              if (attributes.enable) {
                const subService = {};
                subService['id'] = id;
                subService['name'] = attributes.name;
                if (attributes.items.data.length > 0) {
                  subService['items'] = parseReduceData(attributes.items.data);
                }
                acc.push(subService);
              }
              return acc;
            }, []);

            service['sub_services'] = tempSub;
          }
        }
        acc.push(service);
        return acc;
      }, []);
      const res = {
        images,
        services,
      };
      return res;
    } catch (error) {
      throw error;
    }
  },
};
