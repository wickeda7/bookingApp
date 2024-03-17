import { api } from '@api/api';
export const booking = {
  post: async (data) => {
    try {
      const response = await api.postBooking(data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getSpecialistBooking: async (ids) => {
    try {
      const response = await api.getSpecialistBooking(ids);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getUserBooking: async (id, done, type) => {
    try {
      console.log('id', id);
      console.log('done', done);
      console.log('type', type);
      const response = await api.getUserBooking(id, done, type);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteHistory: async (id) => {
    try {
      const response = await api.deleteHistory(id);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getStoreBooking: async (storeId, userId) => {
    try {
      const response = await api.getStoreBooking(storeId, userId);
      const res = response.reduce((acc, item) => {
        const { id, attributes } = item;

        return [...acc, { ...attributes, id }];
      }, []);
      return res;
    } catch (error) {
      throw error;
    }
  },

  getBooking: async (storeId, date) => {
    try {
      const response = await api.getBooking(storeId, date);
      const res = response.data.reduce(
        (acc, item) => {
          const { id, attributes } = item;
          let attr = { ...attributes };
          let clientData = {};
          let specialistData = {};
          let specialistArr = [];
          if (attr.specialists.data.length > 0) {
            attr.specialists.data.forEach((specialist) => {
              const { attributes, id } = specialist.attributes.userInfo.data;
              const data = {
                id: specialist.id,
                email: specialist.attributes.email,
                userInfo: { ...attributes, id },
              };
              specialistArr.push(data);
            });
          }
          if (attr.client.data) {
            const { attributes, id } = attr.client.data.attributes.userInfo.data;
            const userInfo = { ...attributes, id };
            clientData['id'] = attr.client.data.id;
            clientData['email'] = attr.client.data.attributes.email;
            clientData['userInfo'] = userInfo;
          }
          let services = typeof attr.services === 'string' ? JSON.parse(attr.services) : attr.services;
          const type = attr.timeslot === null ? 'walkin' : 'appointment';
          specialistData = specialistArr.length > 0 ? specialistArr[0] : null;
          services = services.map((service) => {
            return {
              id: service.id,
              description: service.description,
              name: service.name,
              price: service.price,
              priceOption: service.priceOption,
              specialist: specialistData,
              client: clientData,
              storeId,
              status: 'pending',
              bookingId: id,
              type,
            };
          });

          const final = { ...attr, client: clientData, specialist: specialistData, services, id };
          if (final.timeslot === null) {
            acc['walkin'].push(final);
          } else {
            acc['appointment'].push(final);
          }
          return acc;
        },
        { walkin: [], appointment: [] }
      );
      return res;
    } catch (error) {
      console.log('error adminHomeAction getBooking', error.response.data.error.message);
      throw error;
    }
  },
  postInvoice: async (data) => {
    try {
      const response = await api.postInvoice(data);
      return data;
    } catch (error) {
      console.log('error booking postInvoice', error.response.data.error.message);
      throw error;
    }
  },
  message: async (data) => {
    try {
      const response = await api.message(data);
      return response.data;
    } catch (error) {
      console.log('error booking message', error.response.data.error.message);
      throw error;
    }
  },
};
