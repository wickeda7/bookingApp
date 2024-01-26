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
};
