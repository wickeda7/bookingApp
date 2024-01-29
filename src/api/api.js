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
      const url = `${STRAPIURL}/api/stores?[filters][county][$eq]=Los Angeles County&[filters][type][$eq]=nail&populate=*`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  putFavorite: async (id, data) => {
    try {
      const url = `${STRAPIURL}/api/users/${id}`;
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      console.log('error putFavorite', error);
      throw error;
    }
  },
};
