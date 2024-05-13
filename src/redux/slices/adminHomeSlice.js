import { createSlice } from '@reduxjs/toolkit';
import {
  getBooking,
  addInvoice,
  updateBooking,
  addSplitService,
  getSettings,
  uploadStoreImage,
  updateService,
  updateEmployee,
  updateStoreInfo,
  timeCard,
  updateBookingService,
} from '../actions/adminHomeAction';
import { t } from 'i18next';
const initialState = {
  staffAvailable: [],
  staffUnAvailable: [],
  walkin: [],
  appointment: [],
  isLoading: false,
  message: '',
  invoice: {},
  storeSettings: {},

  status: null,
};
function tr(key) {
  return t(`homeScreen:${key}`);
}

export const adminHomeSlice = createSlice({
  name: 'adminHome',
  initialState,
  reducers: {
    updateAppointment: (state, action) => {
      const type = action.payload?.type;
      if (type === 'cancel') {
        const bookingId = action.payload.bookingId;
        const timeslot = action.payload.timeslot;
        const bookingType = timeslot === null ? 'walkin' : 'appointment';
        const bookingIndex = state[bookingType].findIndex((obj) => obj.id === bookingId);
        state[bookingType][bookingIndex] = { ...state[bookingType][bookingIndex], canceled: true };
        return;
      }

      const { id, confirmed } = action.payload;
      const appointment = state.appointment.map((obj) => {
        if (obj.id === id) {
          return { ...obj, confirmed: confirmed };
        }
        return obj;
      });
      state.appointment = appointment;
    },
    resetMessage: (state) => {
      const keys = Object.keys(state.invoice);
      const invoice = state.invoice[keys[0]];
      state.message = '';
      if (invoice) {
        let bookings = state[invoice.type];
        const bookingIndex = bookings.findIndex((obj) => obj.id === invoice.appointment);
        let booking = { ...bookings[bookingIndex] };
        const specialistNum = booking.services.filter((obj) => obj.specialistID !== invoice.specialist);
        if (specialistNum.length === 0) {
          bookings.splice(bookingIndex, 1);
        } else {
          booking = { ...booking, services: specialistNum };
          bookings[bookingIndex] = booking;
          state[invoice.type] = bookings;
        }
        const totalAmount = invoice.additional + invoice.subtotal;
        const objectIndex = state.staffUnAvailable.findIndex((obj) => obj.id === invoice.specialist);
        if (objectIndex !== -1) {
          const staff = state.staffUnAvailable[objectIndex];
          const perTurnAmount = staff.amountPerTurn;
          const positionAt = staff.positionAt;
          const turn = staff.turn;
          state.staffUnAvailable.splice(objectIndex, 1);
          if (turn > 1 || totalAmount > perTurnAmount) {
            delete staff.date;
            delete staff.positionAt;
            delete staff.turn;
            delete staff.amountPerTurn;
            state.staffAvailable.push(staff);
          } else {
            state.staffAvailable.splice(positionAt, 0, staff);
          }
        }
        delete state.invoice[keys[0]];
      }
    },
    updateNotification: (state, action) => {
      const data = action.payload;
      const { bookingId, timeslot, specialist, id } = data;
      const bookingType = timeslot === null ? 'walkin' : 'appointment';
      let bookings = state[bookingType];
      const bookingIndex = bookings.findIndex((obj) => obj.id === bookingId);
      let booking = { ...bookings[bookingIndex] };
      let services = booking.services.map((obj) => {
        if (obj.id === id) {
          return { ...obj, ...data };
        }
        return obj;
      });

      booking = { ...booking, alert: true, services };
      bookings[bookingIndex] = booking;
      state[bookingType] = bookings;
    },

    updatePrice: (state, action) => {
      let {
        value,
        item: { price, id, timeslot, bookingId },
        field,
      } = action.payload;
      const bookingType = timeslot === null ? 'walkin' : 'appointment';
      let bookings = state[bookingType];
      const bookingIndex = bookings.findIndex((obj) => obj.id === bookingId);
      let booking = { ...bookings[bookingIndex] };
      let serviceIndex = booking.services.findIndex((obj) => obj.id === id);
      let service = { ...booking.services[serviceIndex] };
      let total = 0;
      if (value !== '') {
        if (field === 'additional') {
          total = price * 100 + +value * 100;
          service = { ...service, additional: +value, total: total / 100 };
        } else if (field === 'price') {
          service = { ...service, price: +value, total: +value };
        } else {
          service = { ...service, notes: value };
        }

        booking.services[serviceIndex] = service;
        bookings[bookingIndex] = booking;
      }
      state[bookingType] = bookings;
    },

    updateStaff: (state, action) => {
      if (action.payload.userInfo) {
        const { userInfo, id } = action.payload;
        const objectIndex = state.staffAvailable.findIndex((obj) => obj.id === id);
        state.staffAvailable.splice(objectIndex, 1);
        state.staffUnAvailable.push(action.payload);
      } else {
        const { bookingId, type, specialist } = action.payload;
        const booking = state[type].find((obj) => obj.id === bookingId);
        const specialistNum = booking.services.filter((obj) => {
          if (obj.specialist && obj.specialist.id === specialist.id) {
            return obj;
          }
        });
        if (specialistNum.length === 0) {
          const objectIndex = state.staffUnAvailable.findIndex((obj) => obj.id === specialist.id);
          state.staffUnAvailable.splice(objectIndex, 1);
          state.staffAvailable.push(specialist);
        }
      }
    },
    setStaff: (state, action) => {
      state.staffAvailable = action.payload;
    },
    setWalkin: (state, action) => {
      state.walkin = [action.payload, ...state.walkin];
    },
    setAppointment: (state, action) => {
      state.appointment = [action.payload, ...state.appointment];
    },
    updateNewInvoice: (state, action) => {
      const { appointment, specialist, type, store } = action.payload;
      let bookings = state[type];
      const bookingIndex = bookings.findIndex((obj) => obj.id === appointment);
      let booking = { ...bookings[bookingIndex] };
      const specialistNum = booking.services.filter((obj) => obj.specialistID !== specialist);
      if (specialistNum.length === 0) {
        bookings.splice(bookingIndex, 1);
      } else {
        booking = { ...booking, services: specialistNum };
        bookings[bookingIndex] = booking;
        state[type] = bookings;
      }
      const objectIndex = state.staffUnAvailable.findIndex((obj) => obj.id === specialist);
      const staff = state.staffUnAvailable[objectIndex];
      state.staffUnAvailable.splice(objectIndex, 1);
      state.staffAvailable.push(staff);
    },
    updateStoreSettings: (state, action) => {
      state.storeSettings = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        const unavailableStaff = action.payload.unavailableStaff;
        if (unavailableStaff.length > 0) {
          unavailableStaff.forEach((obj) => {
            const objectIndex = state.staffAvailable.findIndex((staff) => staff.id === obj);
            const staff = state.staffAvailable[objectIndex];
            state.staffAvailable.splice(objectIndex, 1);
            state.staffUnAvailable.push(staff);
          });
        }

        state.appointment = action.payload.appointment;
        state.walkin = action.payload.walkin;
        state.isLoading = false;
      })
      .addCase(getBooking.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.message = t('adminHomeScreen:invoiceCreated');
        state.isLoading = false;
        state.invoice = { ...state.invoice, [action.payload.specialist]: action.payload };
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(updateBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const { id, services, timeslot, specialists, date, specialistID, callBack, storeID, userID, client, removeId } =
          action.payload;

        const bookingType = timeslot === null ? 'walkin' : 'appointment';
        const bookingIndex = state[bookingType].findIndex((obj) => obj.id === id);
        const booking = { ...state[bookingType][bookingIndex] };
        const pServices = typeof services === 'object' ? services : JSON.parse(services);
        const bSpecialistId = booking.specialistID;

        const newId = bSpecialistId ? bSpecialistId : specialistID;

        if (removeId) {
          const objectIndex = state.staffUnAvailable.findIndex((staff) => staff.id === removeId);
          if (objectIndex !== -1) {
            const staff = state.staffUnAvailable[objectIndex];
            state.staffUnAvailable.splice(objectIndex, 1);
            state.staffAvailable.push(staff);
          }
          state[bookingType][bookingIndex] = {
            ...booking,
            specialistID: null,
            services: pServices,
            specialist: specialists[0],
          };
        } else {
          state[bookingType][bookingIndex] = {
            ...booking,
            specialistID: newId,
            services: pServices,
            specialist: specialists[0],
          };
        }

        state.isLoading = false;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(addSplitService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSplitService.fulfilled, (state, action) => {
        const { id, timeslot } = action.payload;
        const bookingType = timeslot === null ? 'walkin' : 'appointment';
        let bookings = state[bookingType];
        const bookingIndex = bookings.findIndex((obj) => obj.id === id);
        bookings[bookingIndex] = action.payload;
        state[bookingType] = bookings;
        state.isLoading = false;
      })
      .addCase(addSplitService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(getSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.storeSettings = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(uploadStoreImage.pending, (state) => {
        state.status = 'pending';
        state.isLoading = true;
      })
      .addCase(uploadStoreImage.fulfilled, (state, action) => {
        const { imageType, newImage } = action.payload;
        if (imageType === 'storeLogo') {
          state.storeSettings.logo = newImage;
        } else {
          state.storeSettings.images.unshift(newImage);
        }
        state.status = 'fulfilled';
        state.isLoading = false;
      })
      .addCase(uploadStoreImage.rejected, (state, action) => {
        state.status = 'error';
        state.isLoading = false;
      })
      .addCase(updateService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const { ids, data, type } = action.payload;

        let services = state.storeSettings.services;
        const serviceIndex = services.findIndex((obj) => obj.id === ids.serviceId);
        let service = serviceIndex !== -1 ? services[serviceIndex] : null;
        if (data.delete) {
          if (type === 'service') {
            services.splice(serviceIndex, 1);
          } else if (type === 'subService') {
            if (service) {
              let subServices = service.sub_services;
              const subServiceIndex = subServices.findIndex((obj) => obj.id === ids.subServiceId);
              subServices.splice(subServiceIndex, 1);
              service = { ...service, sub_services: subServices };
              services[serviceIndex] = service;
            }
          } else if (type === 'items') {
            const catId = ids.serviceId;
            const subId = ids.subServiceId;
            if (!subId) {
              let items = service.items;
              const itemIndex = items.findIndex((obj) => obj.id === ids.itemId);
              items.splice(itemIndex, 1);
              service = { ...service, items };
              services[serviceIndex] = service;
            } else {
              let subIndex = service.sub_services.findIndex((sub) => sub.id === subId);
              let subService = { ...service.sub_services[subIndex] };
              let items = [...subService.items];
              items = items.filter((i) => i.id !== data.id);
              subService = { ...subService, items };
              service.sub_services[subIndex] = subService;
              services[serviceIndex] = service;
            }
          }
          state.storeSettings.services = services;
          state.isLoading = false;
          return;
        }
        if (type === 'service') {
          if (!service) {
            services.push(data);
          } else {
            service = { ...service, ...data };
            services[serviceIndex] = service;
          }
        } else if (type === 'subService') {
          if (service) {
            let subService = null;
            let subServiceIndex = null;
            let subServices = [];

            if (service.sub_services) {
              subServices = service.sub_services;
              subServiceIndex = subServices.findIndex((obj) => obj.id === ids.subServiceId);
              subService = subServiceIndex !== -1 ? subServices[subServiceIndex] : null;
            }
            if (!subService) {
              subServices.push(data);
              service = { ...service, sub_services: subServices };
            } else {
              subService = { ...subService, ...data };
              subServices[subServiceIndex] = subService;
            }
            services[serviceIndex] = service;
          }
        } else if (type === 'items') {
          if (service) {
            const subId = ids.subServiceId;
            if (!subId) {
              let items = service.items || [];
              const itemIndex = items.findIndex((obj) => obj.id === data.id);
              if (itemIndex === -1) {
                items.unshift(data);
              } else {
                items[itemIndex] = data;
              }
              service = { ...service, items };
              services[serviceIndex] = service;
            } else {
              let subIndex = service.sub_services.findIndex((item) => item.id === subId);
              let subService = { ...service.sub_services[subIndex] };
              let itemsArr = subService.items || [];
              const itemIndex = itemsArr.findIndex((i) => i.id === data.id);
              if (itemIndex === -1) {
                itemsArr.unshift(data);
              } else {
                itemsArr[itemIndex] = data;
              }
              //itemsArr = itemsArr.map((i) => (i.id === data.id ? data : i));
              subService = { ...subService, items: itemsArr };
              service.sub_services[subIndex] = subService;
              services[serviceIndex] = service;
            }
          }
        }
        state.storeSettings.services = services;
        state.isLoading = false;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const { userId, data, id } = action.payload;
        let employees = state.storeSettings.employee;
        const index = employees.findIndex((obj) => obj.id === userId);
        if (id === 'remove') {
          employees.splice(index, 1);
        } else {
          let employee = { ...employees[index] };
          employee = { ...employee, userInfo: { ...employee.userInfo, ...action.payload.data } };
          employees[index] = employee;
        }
        state.storeSettings.employee = employees;
        state.isLoading = false;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(updateStoreInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStoreInfo.fulfilled, (state, action) => {
        let storeSettings = { ...state.storeSettings };
        storeSettings = { ...storeSettings, ...action.payload };
        state.storeSettings = storeSettings;
        state.isLoading = false;
      })
      .addCase(updateStoreInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(timeCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(timeCard.fulfilled, (state, action) => {
        const { id: timeCardId, in: inTime, out: outTime, userId } = action.payload;
        const staffs = [...state.staffAvailable];
        const objIndex = staffs.findIndex((obj) => obj.id === userId);
        let staff = { ...staffs[objIndex] };
        staffs.splice(objIndex, 1);
        if (outTime) {
          staff.out = outTime;
          delete staff.in;
          staffs.push(staff);
        } else {
          staff.in = inTime;
          staff['timeCardId'] = timeCardId;
          delete staff.out;

          const indexes = staffs.map((e, i) => (e.in !== undefined ? i : undefined)).filter((x) => x >= 0);
          if (indexes.length > 0) {
            staffs.splice(indexes.length, 0, staff);
          } else {
            staffs.unshift(staff);
          }
        }
        state.staffAvailable = staffs;
        state.isLoading = false;
      })
      .addCase(timeCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(updateBookingService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBookingService.fulfilled, (state, action) => {
        const services = action.payload;
        const bookingType = services.timeslot === null ? 'walkin' : 'appointment';
        const bookingId = services.id;
        const bookingIndex = state[bookingType].findIndex((obj) => obj.id === bookingId);
        state[bookingType][bookingIndex] = services;
        state.isLoading = false;
      })
      .addCase(updateBookingService.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {
  setStaff,
  setWalkin,
  setAppointment,
  updateStaff,
  updatePrice,
  resetMessage,
  addBooking,
  updateAppointment,
  updateNotification,
  updateNewInvoice,
  updateStoreSettings,
} = adminHomeSlice.actions;
export default adminHomeSlice.reducer;
