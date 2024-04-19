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
  checkInvoice: async (specialistId, storeId, date) => {
    try {
      const response = await api.checkInvoice(specialistId, storeId, date);
      const { additional, tips, total, services } = response.data.reduce(
        (acc, item) => {
          const { attributes, id } = item;
          acc.additional += attributes.additional * 100;
          acc.tips += attributes.tips * 100;
          acc.total += attributes.subtotal * 100;
          const { services } = attributes;
          const temp = services.map((service) => {
            return { ...service, createdAt: attributes.createdAt, type: attributes.type, data: { id, ...attributes } };
          });
          acc.services = [...acc.services, ...temp];
          return acc;
        },
        { tips: 0, total: 0, additional: 0, services: [] }
      );

      return { tips, total, additional, services };
    } catch (error) {
      console.log('error staff checkInvoice', error.response.data.error.message);
      throw error;
    }
  },
  getInvoiceBySpecialist: async ({ specialistId, appointmentId }) => {
    try {
      const response = await api.getInvoiceBySpecialist(specialistId, appointmentId);
      const { id, attributes } = response.data[0];
      return { id, ...attributes };
    } catch (error) {
      console.log('error staff getInvoiceBySpecialist', error.response.data.error.message);
      throw error;
    }
  },
};
