import { api } from '@api/api';
import moment from 'moment';
export const staff = {
  getWeeklyInvoice: async ({ from, to, userId, storeId }) => {
    try {
      const response = await api.getWeeklyInvoice({ from, to, userId, storeId });
      const invoices = {};
      let tips = 0;
      let total = 0;
      response.reduce((acc, item) => {
        const { id, attributes } = item;
        const data = { id, ...attributes };
        const date = data.createdAt.split('T')[0];
        tips += data.additional * 100;
        total += data.total * 100;
        let group = acc[date] || [];
        group.push(data);
        acc[date] = group;
        return acc;
      }, invoices);
      let agendaItems = [];
      for (const [key, value] of Object.entries(invoices)) {
        let data = [];
        let total = 0;
        let tips = 0;
        value.map((item) => {
          total += item.total * 100;
          tips += item.additional * 100;
          data.push(item);
        });
        agendaItems.push({ title: key, data, total, tips });
      }
      //console.log('getWeeklyInvoice', agendaItems);
      //   console.log('getWeeklyInvoice tips', tips);
      //   console.log('getWeeklyInvoice total', total);
      return { agendaItems, tips, total };
    } catch (error) {
      console.log('error staff getWeeklyInvoice', error.response.data.error.message);
      throw error;
    }
  },
};
