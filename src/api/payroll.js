import { api } from '@api/api';

export const payroll = {
  getPayrollData: async (storeId, startDate, endDate) => {
    try {
      const response = await api.getPayrollData(storeId, startDate, endDate);
      return response;
    } catch (error) {
      console.log('error payrolljs getPayrollData', error.response.data.error.message);
      throw error;
    }
  },
  createPayroll: async (data) => {
    try {
      const response = await api.createPayroll(data);
      return response;
    } catch (error) {
      console.log('error payrolljs createPayroll', error.response.data.error.message);
      throw error;
    }
  },
  getStaffPayrollData: async (storeId, payrollId, userId) => {
    try {
      const response = await api.getStaffPayrollData(storeId, payrollId, userId);
      const { id, attributes } = response.data[0];

      let resData = { id, ...attributes };
      if (resData.signature && resData.signature.data) {
        resData.signature = attributes.signature.data.attributes.url;
      } else {
        resData.signature = null;
      }
      return resData;
    } catch (error) {
      console.log('error payrolljs getStaffPayrollData', error.response.data.error.message);
      throw error;
    }
  },
  uploadSignature: async (file, payrollId, userId) => {
    try {
      const response = await api.uploadSignature(file, payrollId);
      return response;
    } catch (error) {
      console.log('error payrolljs uploadSignature', error.response.data.error.message);
      throw error;
    }
  },
  updatePayroll: async (payrollId, data) => {
    try {
      const response = await api.updatePayroll(payrollId, data);
      console.log('response updatePayroll', response);
      return response;
    } catch (error) {
      console.log('error payrolljs updatePayroll', error.response.data.error.message);
      throw error;
    }
  },
  sendMessage: async (data) => {
    try {
      const response = await api.sendMessage(data);
      return response;
    } catch (error) {
      console.log('error payrolljs sendMessage', error.response.data.error.message);
      throw error;
    }
  },
};
