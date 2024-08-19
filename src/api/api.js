import { strapiClient } from '@utils/axiosInstance';

export const api = {
  getUser: async (email) => {
    const url = `/api/users/${email}`;
    try {
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  register: async (data) => {
    const url = `/api/users/register`;
    try {
      const res = await strapiClient.post(url, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getStores: async (county, type) => {
    try {
      //const url = `/api/stores?[filters][county][$eq]=Los Angeles County&[filters][type][$eq]=nail&[populate][0]=logo`;
      const url = `/api/stores/getStores/${county}/${type}`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getStoreById: async (id) => {
    try {
      // const url = `/api/stores/${id}?fields[0]=name&=name&populate[0]=services&populate[1]=services.items&populate[2]=services.sub_services&populate[3]=services.sub_services.items&populate[4]=images&populate[5]=employee&populate[6]=employee.userInfo&populate[7]=employee.userInfo.profileImg&populate[8]=employee.userInfo.images`;
      const response = await strapiClient.get(`/api/stores/populate/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  getSpecialistBooking: async (ids) => {
    try {
      const url = `/api/appointments/specialists/${ids}`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  putFavorite: async (id, data) => {
    try {
      const url = `/api/users/${id}?populate=favorites`;
      const response = await strapiClient.put(url, data);
      if (response.data) {
        const url2 = `/api/users/${response.data.email}`;
        const favRes = await strapiClient.get(url2);
        return favRes.data.data.favorites;
      }

      return response.data;
    } catch (error) {
      console.error('error putFavorite', error);
      throw error;
    }
  },
  getStoreReviews: async (id) => {
    try {
      const url = `/api/review/store/${id}`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getSpecialistReviews: async (id) => {
    try {
      const url = `/api/review/specialist/${id}`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getBookingById: async (id) => {
    try {
      const url = `/api/appointments/${id}?populate[0]=client&populate[1]=client.userInfo&populate[2]=specialists&populate[3]=specialists.userInfo`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('error getBookingById', error);
      throw error;
    }
  },
  postBooking: async (data) => {
    const url = `/api/appointments`;

    try {
      const res = await strapiClient.post(url, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getUserBooking: async (id, done = false, type) => {
    try {
      const url = `/api/appointments/user/${id}/${done}/${type}`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('error getUserBooking', error);
      throw error;
    }
  },
  getStaffBooking: async (id, done = false) => {
    try {
      const url = `/api/appointments?[filters][canceled][$eq]=false&[filters][done][$eq]=${done}&populate[0]=specialists&filters[specialists][id][$eq]=${id}&populate[1]=specialists.userInfo&populate[2]=client&populate[3]=client.userInfo&populate[4]=client.userInfo.profileImg&populate[5]=store`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('error getUserBooking', error);
      throw error;
    }
  },
  deleteHistory: async (id) => {
    try {
      const url = `/api/appointments/cancel/${id}`;
      const response = await strapiClient.put(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateEmail: async (id, data) => {
    try {
      const url = `/api/users/${id}`;
      const response = await strapiClient.put(url, data);
      return response.data;
    } catch (error) {
      console.error('error updateEmail', error);
      throw error;
    }
  },

  updateUser: async (id, data) => {
    try {
      const url = `/api/user-infos/${id}`;
      const response = await strapiClient.put(url, { data });
      return response.data;
    } catch (error) {
      console.error('error updateUser', error);
      throw error;
    }
  },
  uploadProfileImage: async (id, file, type) => {
    let field = '';
    switch (type) {
      case 'storeLogo':
        field = 'logo';
        break;
      case 'storeImages':
        field = 'images';
        break;
      case 'profileImg':
        field = 'profileImg';
        break;
      default:
        field = 'images';
        break;
    }
    try {
      const url = `/api/upload`;
      const formData = new FormData();
      const fileName = file.split('/').pop();
      const fileType = fileName.split('.').pop();

      formData.append('files', {
        name: fileName,
        type: 'image/jpeg',
        uri: file,
      });
      if (type === 'storeLogo' || type === 'storeImages') {
        formData.append('ref', 'api::store.store');
      } else {
        formData.append('ref', 'api::user-info.user-info');
      }
      formData.append('refId', id);
      formData.append('field', field);

      const res = await strapiClient.post(url, formData);
      return res.data;
    } catch (error) {
      console.error('error uploadProfileImage', error);
    }
  },
  deleteImage: async (id) => {
    try {
      const url = `/api/upload/files/${id}`;
      const response = await strapiClient.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  unverifiedStaff: async (id) => {
    try {
      const url = `/api/access-codes?filters[code][$startsWithi]=${id}_`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createAccessCode: async ({ data, method }) => {
    const url = `/api/access-codes`;
    try {
      if (method === 'PUT') {
        const id = data.id;
        delete data.id;
        const response = await strapiClient.put(`${url}/${id}`, { data });
        return response.data;
      } else if (method === 'POST') {
        const response = await strapiClient.post(url, { data: data });
        return response.data;
      } else if (method === 'DELETE') {
        const response = await strapiClient.post(`${url}/deleteCode`, { data });
        return response.data;
      }
      // const response = await axios.post(url, { data: data });
      // return response.data;
    } catch (error) {
      console.error('error createAccessCode', error);
      throw error;
    }
  },
  getAccessCode: async (userId, code) => {
    try {
      ///api/access-codes/getCode
      const url = `/api/access-codes/getCode/${userId}/${code}`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('error getAccessCode', error);
      throw error;
    }
  },
  sendCode: async (item) => {
    try {
      const url = `/api/access-codes/sendCode`;
      const response = await strapiClient.post(url, { data: item });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getStoreBooking: async (storeId) => {
    try {
      //http://localhost:1337/api/appointments?filters[userID][$eq]=51&filters[storeId][$eq]=1&filters[done][$eq]=false&filters[specialistId][$eq]=null
      const url = `/api/appointments?filters[storeId][$eq]=${storeId}&filters[done][$eq]=false&filters[specialistID][$null]=true&cancel[$eq]=false`;
      // const url = `/api/appointments?filters[storeId][$eq]=${storeId}&filters[id][$eq]=94`;
      const response = await strapiClient.get(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  updateToken: async (id, pushToken) => {
    ///api/user-infos/notificationToken
    try {
      const url = `/api/user-infos/notificationToken`;
      const response = await strapiClient.post(url, { id, pushToken });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getBooking: async (storeId, date) => {
    try {
      // const url = `/api/appointments?filters[storeId][$eq]=${storeId}&filters[done][$eq]=false&filters[date][$eq]=${date}&filters[timeslot][$notNull]&populate[0]=client&populate[1]=client.userInfo&populate[2]=specialist&populate[3]=specialist.userInfo`;
      const url = `/api/appointments?filters[storeId][$eq]=${storeId}&filters[done][$eq]=false&filters[canceled][$eq]=false&filters[date][$eq]=${date}&populate[0]=client&populate[1]=client.userInfo&populate[2]=specialists&populate[3]=specialists.userInfo&populate[4]=register&sort[0]=id:ASC`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  postInvoice: async (data) => {
    try {
      const url = `/api/invoices`;
      const response = await strapiClient.post(url, { data });
      return data;
    } catch (error) {
      console.error('error postInvoice API', error);
      throw error;
    }
  },
  message: async (data) => {
    try {
      const url = `/api/appointments/message`;
      const response = await strapiClient.post(url, { data });
      return response.data;
    } catch (error) {
      console.error('error message API', error);
      throw error;
    }
  },
  updateBookingService: async (id, data) => {
    try {
      const url = `/api/appointments/${id}?populate=client&populate[1]=client.userInfo&populate[2]=register`;

      const response = await strapiClient.put(url, { data: { services: data } });
      return response.data;
    } catch (error) {
      console.error('error updateBookingService API', error);
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

      const url = `/api/appointments/booking/${id}`;
      const response = await strapiClient.put(url, { data: { service: tempSer, type, staff } });
      return response.data;
    } catch (error) {
      console.error('error message API', error);
      throw error;
    }
  },
  notifyBooking: async (data) => {
    try {
      const url = `/api/appointments/notify`;
      const response = await strapiClient.post(url, { data });
      return response.data;
    } catch (error) {
      console.error('error notifyBooking API', error);
      throw error;
    }
  },
  getInvoiceByDate: async ({ from, to, userId, storeId }) => {
    try {
      // const url = `/api/invoices?filters[$and][0][createdAt][$gte]=${from}&filters[$and][1][createdAt][$lt]=${to}&filters[store][id][$eq]=${storeId}&filters[specialist][id][$eq]=${userId}&populate[0]=client&populate[1]=client.userInfo&populate[2]=client.userInfo.profileImg&sort[0]=createdAt:DESC`;
      const url = `/api/invoices?filters[$and][0][createdAt][$gte]=${from}&filters[$and][1][createdAt][$lt]=${to}&filters[store][id][$eq]=${storeId}&filters[specialist][id][$eq]=${userId}&populate[0]=client&populate[1]=client.userInfo&populate[2]=client.userInfo.profileImg&populate[3]=appointment&populate[4]=appointment.specialists&populate[5]=specialist&sort[0]=createdAt:ASC`;
      const response = await strapiClient.get(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  getStoreSettings: async (storeId) => {
    try {
      const url = `/api/stores/settings/${storeId}`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateService: async (ids, data, type) => {
    let url = '';
    let id = '';
    if (type === 'service') {
      url = `/api/services`;
      id = ids.serviceId;
    } else if (type === 'subService') {
      url = `/api/sub-services`;
      id = ids.subServiceId;
    } else {
      url = `/api/items`;
      id = ids.itemId;
    }

    try {
      if (data.delete) {
        const response = await strapiClient.delete(`${url}/${id}`);
        return response.data;
      }

      if (id !== 'new') {
        const response = await strapiClient.put(`${url}/${id}`, { data });
        return response.data;
      } else {
        delete data.id;
        const response = await strapiClient.post(`${url}`, { data });
        return response.data;
      }
    } catch (error) {
      console.error('error updateService API', error);
      throw error;
    }
  },
  updateStoreInfo: async (id, data) => {
    const url = `/api/stores`;
    try {
      const response = await strapiClient.put(`${url}/${id}`, { data });
      return response.data;
    } catch (error) {
      console.error('error updateStoreInfo API', error);
      throw error;
    }
  },
  getPayrollData: async (storeId, startDate, endDate) => {
    try {
      const url = `/api/invoices/payroll/${storeId}/${startDate}/${endDate}`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createPayroll: async (data) => {
    try {
      const url = `/api/payrolls`;
      const response = await strapiClient.post(url, { data });
      return response.data;
    } catch (error) {
      console.error('error createPayroll API', error);
      throw error;
    }
  },
  getStaffPayrollData: async (storeId, payrollId, userId) => {
    ///bookingbackend-ce816c7b0be8.herokuapp.com/api/payrolls?filters[$and][0][id][$eq]=5&filters[$and][1][storeId][$eq]=1&filters[$and][2][specialistId][$eq]=8
    try {
      const url = `/api/payrolls?filters[$and][0][id][$eq]=${payrollId}&filters[$and][1][storeId][$eq]=${storeId}&filters[$and][2][specialistId][$eq]=${userId}&[populate][0]=signature`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  uploadSignature: async (file, payrollId, userId) => {
    try {
      const url = `/api/upload`;
      const formData = new FormData();

      formData.append('files', {
        name: file.name,
        type: file.type,
        uri: file.uri,
      });
      formData.append('ref', 'api::payroll.payroll');
      formData.append('refId', payrollId);
      formData.append('field', 'signature');

      const headers = {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data',
      };
      const res = await strapiClient.post(url, formData, {
        headers: headers,
      });
      return res.data;
    } catch (error) {
      console.error('error uploadSignature API', error);
    }
  },
  updatePayroll: async (payrollId, data) => {
    try {
      const url = `/api/payrolls/${payrollId}?populate=signature`;
      const response = await strapiClient.put(url, { data });
      return response.data;
    } catch (error) {
      console.error('error updatePayroll API', error);
      throw error;
    }
  },
  sendMessage: async (data) => {
    try {
      const url = `/api/payrolls/message`;
      const response = await strapiClient.post(url, { data });
      return response.data;
    } catch (error) {
      console.error('error sendMessage API', error);
      throw error;
    }
  },
  checkInvoice: async (specialistId, storeId, date) => {
    try {
      //console.log('checkInvoice API', specialistId, storeId, date);
      const url = `/api/invoices/?filters[$and][0][specialist][id][$eq]=${specialistId}&filters[$and][1][store][id][$eq]=${storeId}&filters[$and][1][createdAt][$eq]=${date}&populate[0]=client&populate[1]=client.userInfo`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getInvoiceBySpecialist: async (specialistId, appointmentId) => {
    try {
      const url = `/api/invoices?filters[appointment][id][$eq]=${appointmentId}&filters[specialist][id][$eq]=${specialistId}&populate[0]=specialist&populate[1]=specialist.userInfo`;
      const response = await strapiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  timeCard: async (id, data) => {
    try {
      let url = '';
      let response = '';
      if (id) {
        url = `/api/timecards/${id}`;
        response = await strapiClient.put(url, { data });
      } else {
        url = `/api/timecards`;
        response = await strapiClient.post(url, { data });
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
