import axios from 'axios';

import { STRAPIURL } from '@env';

export const api = {
  getUser: async (email) => {
    try {
      const url = `${STRAPIURL}/api/users/${email}`;
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  register: async (data) => {
    const url = `${STRAPIURL}/api/users/register`;
    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };
    try {
      const res = await axios.post(url, data);

      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getStores: async () => {
    try {
      const url = `${STRAPIURL}/api/stores?[filters][county][$eq]=Los Angeles County&[filters][type][$eq]=nail&[populate][0]=logo`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getStoreById: async (id) => {
    try {
      // const url = `${STRAPIURL}/api/stores/${id}?fields[0]=name&=name&populate[0]=services&populate[1]=services.items&populate[2]=services.sub_services&populate[3]=services.sub_services.items&populate[4]=images&populate[5]=employee&populate[6]=employee.userInfo&populate[7]=employee.userInfo.profileImg&populate[8]=employee.userInfo.images`;
      const response = await axios.get(`${STRAPIURL}/api/stores/populate/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  putFavorite: async (id, data) => {
    try {
      const url = `${STRAPIURL}/api/users/${id}?populate=favorites`;
      const response = await axios.put(url, data);
      if (response.data) {
        const url2 = `${STRAPIURL}/api/users/${response.data.email}`;
        const favRes = await await axios.get(url2);
        return favRes.data.data.favorites;
      }

      return response.data;
    } catch (error) {
      console.log('error putFavorite', error);
      throw error;
    }
  },
  getStoreReviews: async (id) => {
    try {
      const url = `${STRAPIURL}/api/review/store/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
