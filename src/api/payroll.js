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
      return { id, ...attributes };
    } catch (error) {
      console.log('error payrolljs getStaffPayrollData', error.response.data.error.message);
      throw error;
    }
  },
};
