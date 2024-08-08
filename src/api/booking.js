import { api } from '@api/api';
import { parseStrapiBooking } from '@utils/helper';
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
      const response = await api.getUserBooking(id, done, type);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getStaffBooking: async (id, done) => {
    try {
      const response = await api.getStaffBooking(id, done);
      const res = response.data.reduce((acc, item) => {
        const data = parseStrapiBooking(item, id);

        return [...acc, data];
      }, []);
      return res;
    } catch (error) {
      throw error;
    }
  },
  deleteHistory: async (bookingId) => {
    try {
      const response = await api.deleteHistory(bookingId);
      const { id, timeslot } = response.data;
      return { id, timeslot };
    } catch (error) {
      throw error;
    }
  },
  getStoreBooking: async (storeId) => {
    try {
      const response = await api.getStoreBooking(storeId);
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
          let workingId = new Set();
          // fixed specialists data is for request specialist
          // specialist  assigned to client is in services
          if (attr.specialists.data.length > 0) {
            const { attributes, id } = attr.specialists.data[0].attributes.userInfo.data;
            const userInfo = { ...attributes, id };
            specialistData['id'] = attr.specialists.data[0].id;
            specialistData['email'] = attr.specialists.data[0].attributes.email;
            specialistData['userInfo'] = userInfo;
          }
          if (attr.client.data) {
            const { attributes, id } = attr.client.data.attributes.userInfo.data;
            const userInfo = { ...attributes, id };
            clientData['id'] = attr.client.data.id;
            clientData['email'] = attr.client.data.attributes.email;
            clientData['firstName'] = userInfo.firstName;
            clientData['lastName'] = userInfo.lastName;
          }
          if (attr.register.data) {
            const { email, name, phone } = attr.register.data.attributes;

            clientData['id'] = attr.register.data.id;
            clientData['email'] = email;
            clientData['name'] = name;
            clientData['phone'] = phone;
          }
          let services = null;
          let type = 'walkin';
          if (attr.services) {
            services = typeof attr.services === 'string' ? JSON.parse(attr.services) : attr.services;
          }
          if (attr.timeslot !== null) {
            type = 'appointment';
          }
          specialistData = attr.specialists.data.length > 0 ? specialistData : null;
          if (services) {
            services = services.map((service) => {
              if (service.status === 'working') {
                workingId.add(service.specialist.id);
              }
              if (service.bookingId) {
                return service;
              } else {
                return {
                  id: service.id,
                  description: service.description,
                  name: service.name,
                  price: service.price,
                  priceOption: service.priceOption,
                  specialist: service.specialist,
                  reqSpecialist: specialistData,
                  client: clientData,
                  storeId,
                  status: service.status ? service.status : 'pending',
                  bookingId: id,
                  type,
                };
              }
            });
          }

          const final = { ...attr, client: clientData, specialist: specialistData, services, id };
          if (Array.from(workingId).length > 0) {
            const temp = Array.from(workingId);
            temp.forEach((id) => {
              acc['unavailableStaff'].push(id);
            });
          }
          if (final.timeslot === null) {
            acc['walkin'].push(final);
          } else {
            acc['appointment'].push(final);
          }
          return acc;
        },
        { walkin: [], appointment: [], unavailableStaff: [] }
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
  updateBooking: async ({ service, type, staff }) => {
    try {
      const response = await api.updateBooking({ service, type, staff });
      return response.data;
    } catch (error) {
      console.log('error booking updateBooking', error.response.data.error.message);
      throw error;
    }
  },
  notifyBooking: async (data) => {
    try {
      const response = await api.notifyBooking(data);
      return response.data;
    } catch (error) {
      console.log('error booking notifyBooking', error.response.data.error.message);
      throw error;
    }
  },
  getBookingById: async (bookingId, userId) => {
    try {
      const response = await api.getBookingById(bookingId);
      const data = parseStrapiBooking(response.data, userId);

      return data;
    } catch (error) {
      console.log('error booking getBookingById', error.response.data.error.message);
      throw error;
    }
  },
  updateBookingService: async (id, data) => {
    try {
      const response = await api.updateBookingService(id, data);
      const { id: bookingId, attributes } = response.data;

      let client = null;
      let clientinfo = null;
      const services = attributes.services;
      const isClient = attributes.client.data ? true : false; // check if client is register or not
      const cli = isClient ? attributes.client.data : attributes.register.data;
      if (isClient) {
        const info = cli.attributes.userInfo.data;
        delete cli.attributes.userInfo;
        clientinfo = { ...info.attributes, id: info.id };
      } else {
        clientinfo = { ...cli.attributes, id: cli.id };
      }
      client = { ...cli.attributes, id: cli.id, userInfo: clientinfo };
      const servArr = services.reduce((acc, item) => {
        acc.push({
          ...item,
          bookingId,
          client,
          storeId: attributes.storeID,
          status: 'pending',
          type: attributes.timeslot === null ? 'walkin' : 'appointment',
        });
        return acc;
      }, []);
      const final = {
        id: bookingId,
        client,
        status: 'pending',
        storeID: attributes.storeID,
        timeslot: attributes.timeslot,
        services: servArr,
      };

      return final;
    } catch (error) {
      console.log('error updateBookingService', error);
      throw error;
    }
  },
};
