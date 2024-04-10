import { api } from '@api/api';
import { parseAccordionData } from '@utils/helper';
import moment from 'moment';
export const staff = {
  getInvoiceByDate: async ({ from, to, userId, storeId }) => {
    try {
      const response = await api.getInvoiceByDate({ from, to, userId, storeId });
      const invoices = {};
      let tips = 0;
      let total = 0;
      response.reduce((acc, item) => {
        const { id, attributes } = item;
        const data = { id, ...attributes };
        const date = data.testCreatedAt.split('T')[0];
        tips += data.additional * 100;
        total += data.total * 100;
        let group = acc[date] || [];
        group.push(data);
        acc[date] = group;
        return acc;
      }, invoices);
      const agendaItems = parseAccordionData(invoices);
      //agendaitems tips and total are per day
      /// tips and total are top level

      return { agendaItems, tips, total };
    } catch (error) {
      console.log('error staff getInvoiceByDate', error.response.data.error.message);
      throw error;
    }
  },
};
