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
};
