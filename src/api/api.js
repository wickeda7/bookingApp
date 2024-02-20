import axios from 'axios';

import { STRAPIURL } from '@env';
//const STRAPIURL = 'http://localhost:1337';
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
  getStores: async (county, type) => {
    try {
      //const url = `${STRAPIURL}/api/stores?[filters][county][$eq]=Los Angeles County&[filters][type][$eq]=nail&[populate][0]=logo`;
      const url = `${STRAPIURL}/api/stores/getStores/${county}/${type}`;
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
  getSpecialistReviews: async (id) => {
    try {
      const url = `${STRAPIURL}/api/review/specialist/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getSpecialistBooking: async (ids) => {
    try {
      const url = `${STRAPIURL}/api/appointments/specialists/${ids}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  postBooking: async (data) => {
    const url = `${STRAPIURL}/api/appointments`;
    const headers = {
      'Content-Type': 'application/json',
      Accept: '*/*',
    };
    try {
      const res = await axios.post(url, data);

      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getUserBooking: async (id, done = false, type) => {
    try {
      const url = `${STRAPIURL}/api/appointments/user/${id}/${done}/${type}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteHistory: async (id) => {
    try {
      const url = `${STRAPIURL}/api/appointments/cancel/${id}`;
      const response = await axios.put(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateEmail: async (id, data) => {
    try {
      const url = `${STRAPIURL}/api/users/${id}`;
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      console.log('error updateUser', error);
      throw error;
    }
  },
  updateUser: async (id, data) => {
    try {
      const url = `${STRAPIURL}/api/user-infos/${id}`;
      const response = await axios.put(url, { data });
      return response.data;
    } catch (error) {
      console.log('error updateUser', error);
      throw error;
    }
  },
  uploadProfileImage: async (id, file) => {
    try {
      const url = `${STRAPIURL}/api/upload`;
      const formData = new FormData();
      const fileName = file.split('/').pop();
      const fileType = fileName.split('.').pop();

      formData.append('files', {
        name: fileName,
        type: 'image/jpeg',
        uri: file,
      });
      formData.append('ref', 'api::user-info.user-info');
      formData.append('refId', id);
      formData.append('field', 'profileImg');
      const headers = {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
      };
      const res = await axios.post(url, formData, {
        headers: headers,
      });
      return res.data;
    } catch (error) {
      console.log('error uploadProfileImage', error);
    }
  },
};
