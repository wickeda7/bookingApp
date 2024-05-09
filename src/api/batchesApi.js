import axios from 'axios';
/// always update the STRAPIURL to utils/socket.js too
import { STRAPIURL } from '@env';
//const STRAPIURL = 'http://localhost:1337';
import moment from 'moment';

export const batchApi = {
  getInvoicesByDate: async (storeId, date) => {
    try {
      const todayStart = moment(date).startOf('day');
      const todayEnd = moment(date).endOf('day');
      // console.log('todayStart: ', todayStart.toISOString());///2024-05-01T07:00:00.000Z
      // console.log('todayEnd: ', todayEnd.toISOString());///2024-05-02T06:59:59.999Z
      const url = `${STRAPIURL}/api/invoices?filters[$and][0][createdAt][$gte]=${todayStart.toISOString()}&filters[$and][1][createdAt][$lte]=${todayEnd.toISOString()}&filters[$and][2][store][id][$eq]=${storeId}&populate[0]=appointment&populate[1]=specialist&populate[2]=specialist.userInfo&sort[0]=createdAt:DESC&pagination[start]=0&pagination[limit]=-1`;
      // console.log('url: ', url);
      const response = await axios.get(url);
      //console.log('response batchApi getInvoicesByDate: ', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error batchApi getInvoicesByDate: ', error);
      throw error;
    }
  },
  getServiceItems: async (id) => {
    try {
      const url = `${STRAPIURL}/api/items?filters[storeId][id][$eq]=${id}&pagination[start]=0&pagination[limit]=-1`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error: ', error);
    }
  },
  updateBatch: async (data) => {
    try {
      const response = await axios.put(`${STRAPIURL}/batches/${data.id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error: ', error);
    }
  },
  deleteBatch: async (id) => {
    try {
      const response = await axios.delete(`${STRAPIURL}/batches/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error: ', error);
    }
  },
};
