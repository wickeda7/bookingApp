import axios from 'axios';
/// always update the STRAPIURL to utils/socket.js too
import { STRAPIURL } from '@env';
//const STRAPIURL = 'http://localhost:1337';
import moment from 'moment';
export const api = {
  getUser: async (email) => {
    const url = `${STRAPIURL}/api/users/${email}`;
    try {
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
  getSpecialistBooking: async (ids) => {
    try {
      const url = `${STRAPIURL}/api/appointments/specialists/${ids}`;
      const response = await axios.get(url);
      return response.data;
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
  getBookingById: async (id) => {
    try {
      const url = `${STRAPIURL}/api/appointments/${id}?populate[0]=client&populate[1]=client.userInfo&populate[2]=specialists&populate[3]=specialists.userInfo`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log('error getBookingById', error);
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
      console.log('error getUserBooking', error);
      throw error;
    }
  },
  getStaffBooking: async (id, done = false) => {
    try {
      const url = `${STRAPIURL}/api/appointments?[filters][canceled][$eq]=false&[filters][done][$eq]=${done}&populate[0]=specialists&filters[specialists][id][$eq]=${id}&populate[1]=specialists.userInfo&populate[2]=client&populate[3]=client.userInfo&populate[4]=client.userInfo.profileImg&populate[5]=store`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log('error getUserBooking', error);
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
      console.log('error updateEmail', error);
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
  uploadProfileImage: async (id, file, type) => {
    let field = type ? type : 'profileImg';
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
      if (type === 'logo') {
        formData.append('ref', 'api::store.store');
      } else {
        formData.append('ref', 'api::user-info.user-info');
      }
      formData.append('refId', id);
      formData.append('field', field);
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
  deleteImage: async (id) => {
    try {
      const url = `${STRAPIURL}/api/upload/files/${id}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  unverifiedStaff: async (id) => {
    try {
      const url = `${STRAPIURL}/api/access-codes?filters[code][$startsWithi]=${id}_`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createAccessCode: async ({ data, method }) => {
    const url = `${STRAPIURL}/api/access-codes`;
    try {
      if (method === 'PUT') {
        const id = data.id;
        delete data.id;
        const response = await axios.put(`${url}/${id}`, { data });
        return response.data;
      } else if (method === 'POST') {
        const response = await axios.post(url, { data: data });
        return response.data;
      } else if (method === 'DELETE') {
        const response = await axios.post(`${url}/deleteCode`, { data });
        return response.data;
      }
      // const response = await axios.post(url, { data: data });
      // return response.data;
    } catch (error) {
      console.log('error createAccessCode', error);
      throw error;
    }
  },
  getAccessCode: async (userId, code) => {
    try {
      ///api/access-codes/getCode
      const url = `${STRAPIURL}/api/access-codes/getCode/${userId}/${code}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log('error getAccessCode', error);
      throw error;
    }
  },
  sendCode: async (item) => {
    try {
      const url = `${STRAPIURL}/api/access-codes/sendCode`;
      const response = await axios.post(url, { data: item });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getStoreBooking: async (storeId) => {
    try {
      //http://localhost:1337/api/appointments?filters[userID][$eq]=51&filters[storeId][$eq]=1&filters[done][$eq]=false&filters[specialistId][$eq]=null
      const url = `${STRAPIURL}/api/appointments?filters[storeId][$eq]=${storeId}&filters[done][$eq]=false&filters[specialistID][$null]=true&cancel[$eq]=false`;
      // const url = `${STRAPIURL}/api/appointments?filters[storeId][$eq]=${storeId}&filters[id][$eq]=94`;
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  updateToken: async (id, pushToken) => {
    ///api/user-infos/notificationToken
    try {
      const url = `${STRAPIURL}/api/user-infos/notificationToken`;
      const response = await axios.post(url, { id, pushToken });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getBooking: async (storeId, date) => {
    try {
      // const url = `${STRAPIURL}/api/appointments?filters[storeId][$eq]=${storeId}&filters[done][$eq]=false&filters[date][$eq]=${date}&filters[timeslot][$notNull]&populate[0]=client&populate[1]=client.userInfo&populate[2]=specialist&populate[3]=specialist.userInfo`;
      const url = `${STRAPIURL}/api/appointments?filters[storeId][$eq]=${storeId}&filters[done][$eq]=false&filters[canceled][$eq]=false&filters[date][$eq]=${date}&populate[0]=client&populate[1]=client.userInfo&populate[2]=specialists&populate[3]=specialists.userInfo&sort[0]=id:DESC`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  postInvoice: async (data) => {
    try {
      const url = `${STRAPIURL}/api/invoices`;
      const today = moment().format('YYYY-MM-DD');

      const filterURL = `${STRAPIURL}/api/invoices?filters[appointment][id][$eq]=${data.appointment}&filters[specialist][id][$eq]=${data.specialist}&filters[createAt][$eq]=${today}`;
      const res = await axios.get(filterURL);
      if (res.data.data.length > 0) {
        return data;
      } else {
        const response = await axios.post(url, { data });
        return data;
      }
    } catch (error) {
      console.log('error postInvoice API', error);
      throw error;
    }
  },
  message: async (data) => {
    try {
      const url = `${STRAPIURL}/api/appointments/message`;
      const response = await axios.post(url, { data });
      return response.data;
    } catch (error) {
      console.log('error message API', error);
      throw error;
    }
  },
  updateBooking: async ({ service, type, staff }) => {
    try {
      const id = service.bookingId;
      let tempSer = {};
      if (type === 'remove') {
        tempSer = {
          id: service.id,
          specialist: service.specialist,
        };
      } else if (type === 'splitService') {
        tempSer = service;
      } else {
        tempSer = {
          id: service.id,
          specialist: staff,
        };
      }

      const url = `${STRAPIURL}/api/appointments/booking/${id}`;
      const response = await axios.put(url, { data: { service: tempSer, type, staff } });
      return response.data;
    } catch (error) {
      console.log('error message API', error);
      throw error;
    }
  },
  notifyBooking: async (data) => {
    try {
      const url = `${STRAPIURL}/api/appointments/notify`;
      const response = await axios.post(url, { data });
      return response.data;
    } catch (error) {
      console.log('error notifyBooking API', error);
      throw error;
    }
  },
  getInvoiceByDate: async ({ from, to, userId, storeId }) => {
    try {
      const url = `${STRAPIURL}/api/invoices?filters[$and][0][createdAt][$gte]=${from}&filters[$and][1][createdAt][$lt]=${to}&filters[store][id][$eq]=${storeId}&filters[specialist][id][$eq]=${userId}&populate[0]=client&populate[1]=client.userInfo&populate[2]=client.userInfo.profileImg&sort[0]=createdAt:DESC`;
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  getStoreSettings: async (storeId) => {
    try {
      const url = `${STRAPIURL}/api/stores/settings/${storeId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateService: async (ids, data, type) => {
    let url = '';
    let id = '';

    if (type === 'service') {
      url = `${STRAPIURL}/api/services`;
      id = ids.serviceId;
    } else if (type === 'subService') {
      url = `${STRAPIURL}/api/sub-services`;
      id = ids.subServiceId;
    } else {
      url = `${STRAPIURL}/api/items`;
      id = ids.itemId;
    }

    try {
      if (data.delete) {
        // console.log('ids', ids);
        // console.log('data', data);
        // console.log('type', type);
        // console.log('url', url);
        // console.log('id', id);
        // return;
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
      }
      if (type === 'items') {
        if (data.service || data.sub_service) {
          delete data.id;
          const response = await axios.post(`${url}`, { data });
          return response.data;
        } else {
          delete data.id;
          console.log('data', data);
          console.log('ids', ids);
          console.log('url', url);
          console.log('id', id);
          const response = await axios.put(`${url}/${id}`, { data });
          console.log('id', id);
          return response.data;
        }
        // const response = await axios.post(`${url}`, { data });

        return;
      }
      if (id !== 'new') {
        const response = await axios.put(`${url}/${id}`, { data });
        return response.data;
      } else {
        const response = await axios.post(`${url}`, { data });
        return response.data;
      }
    } catch (error) {
      console.log('error updateService API', error);
      throw error;
    }
  },
};
