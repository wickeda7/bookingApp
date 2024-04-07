import { createIconSetFromFontello } from 'react-native-vector-icons';
import moment from 'moment';
import tableMap from '@constants/map';
import { Colors, Default, Fonts } from '@constants/style';
import { t } from 'i18next';
export const formatPhoneNumber = (value) => {
  //https://aprilescobar.medium.com/phone-number-formatting-made-easy-1b887872ab2f
  if (!value) return;
  let formattedNumber;
  const length = value.length;

  // Filter non numbers
  const regex = () => value.replace(/[^0-9\.]+/g, '');
  // Set area code with parenthesis around it
  const areaCode = () => `(${regex().slice(0, 3)})`;

  // Set formatting for first six digits
  const firstSix = () => `${areaCode()} ${regex().slice(3, 6)}`;

  // Dynamic trail as user types
  const trailer = (start) => `${regex().slice(start, regex().length)}`;
  if (length < 3) {
    // First 3 digits
    formattedNumber = regex();
  } else if (length === 4) {
    // After area code
    formattedNumber = `${areaCode()} ${trailer(3)}`;
  } else if (length === 5) {
    // When deleting digits inside parenthesis
    formattedNumber = `${areaCode().replace(')', '')}`;
  } else if (length > 5 && length < 9) {
    // Before dash
    formattedNumber = `${areaCode()} ${trailer(3)}`;
  } else if (length >= 10) {
    // After dash
    formattedNumber = `${firstSix()}-${trailer(6)}`;
  }
  if (!formattedNumber) return value;
  return formattedNumber;
};

export const parseReduceData = (data) => {
  const reduced = data.reduce((acc, item) => {
    const { id, attributes } = item;
    if (attributes.enable) {
      acc.push({
        id,
        name: attributes.name,
        price: attributes.price,
        description: attributes.description,
        priceOption: attributes.priceOption,
      });
    }
    return acc;
  }, []);
  return reduced;
};
export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const imageUrlToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((onSuccess, onError) => {
    try {
      const reader = new FileReader();
      reader.onload = function () {
        onSuccess(this.result);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      onError(e);
    }
  });
};
export const parseEvents = (data, userId) => {
  if (data.length === 0) return [];
  let EVENT_COLOR = '#e6add8'; //bbd686 8ecae6
  const today = new Date();
  return data.reduce((acc, item) => {
    const date = item.date;
    let walkinServices = [];
    if (item.specialists.length === 0) return acc;
    let services = typeof item.services === 'object' ? item.services : JSON.parse(item.services);

    if (item.timeslot === null) {
      walkinServices = services.filter((service) => service.specialistID === userId);
      if (walkinServices.length === 0) return acc;
    }

    if (item.timeslot) {
      const more = services.length > 1 ? ', .....' : '';
      const time = item.specialists[0].userInfo.hours.find((hour) => +hour.id === item.timeslot);
      const temp = time.hours.split(' - ');
      const startTime = temp[0];
      const endTime = temp[1];
      acc.push({
        id: item.id,
        title: `${item.client.userInfo.firstName} ${item.client.userInfo.lastName}`,
        start: moment(`${date} ${startTime}`, 'YYYY-MM-DD h:m A').format('YYYY-MM-DD HH:mm'),
        end: moment(`${date} ${endTime}`, 'YYYY-MM-DD h:m A').format('YYYY-MM-DD HH:mm'),
        summary: `${services[0].name}${more}`,
        color: Colors.info,
        timeslot: item.timeslot,
        canceled: item.canceled,
        confirmed: item.confirmed,
      });
    } else {
      const more = walkinServices.length > 1 ? ', .....' : '';
      const start = moment().format('YYYY-MM-DD HH:mm');
      const end = moment().add(60, 'minutes').format('YYYY-MM-DD HH:mm');

      acc.push({
        id: item.id,
        title: `${item.client.userInfo.firstName} ${item.client.userInfo.lastName}`,
        start: start,
        end: end,
        summary: `${walkinServices[0].name}${more}`,
        color: Colors.success,
        timeslot: item.timeslot,
        canceled: item.canceled,
      });
    }

    return acc;
  }, []);
};
export const tableRows = (data, header, type) => {
  const map = tableMap[type];
  const headerMap = header.reduce((acc, item) => {
    const { name, size } = item;
    acc.push({ size, dataKey: map[name], headerName: name });
    return acc;
  }, []);
  return headerMap;
};
export const appointmentTime = (hours, timeslot) => {
  let time = '';
  if (!hours) {
    const time = moment().format('h:mm A');
    return time;
  }
  const temp = hours.find((hour) => +hour.id === timeslot);
  let hour = temp.hours.split('-');
  time = hour[0];
  return time;
};
export const parseStrapiBooking = (data, userId) => {
  const { id, attributes } = data;
  let { id: clientId, attributes: clientAtt } = attributes.client.data;
  let { id: clientUserInfoId, attributes: clientUserInfoAtt } = clientAtt.userInfo.data;
  const client = { ...clientAtt, id: clientId, userInfo: { ...clientUserInfoAtt, id: clientUserInfoId } };
  let temp = attributes.specialists.data.filter((item) => item.id === userId);
  let specialistArr = [];
  if (temp.length > 0) {
    let { id: specialistId, attributes: specialistAtt } = temp[0];
    let { id: specialistUserInfoId, attributes: specialistUserInfoAtt } = specialistAtt.userInfo.data;
    const specialist = {
      ...specialistAtt,
      id: specialistId,
      userInfo: { ...specialistUserInfoAtt, id: specialistUserInfoId },
    };
    specialistArr.push(specialist);
  }
  let services = typeof attributes.services === 'string' ? JSON.parse(attributes.services) : attributes.services;
  if (attributes.timeslot === null) {
    services = services.filter((item) => item.specialistID === userId);
  }
  return { ...attributes, id, client, specialists: specialistArr, services };
};
export const getMonday = () => {
  const d = new Date();
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
};
export const getDateOfMonth = (weekDay, payperiod) => {
  //payperiod 1 = weekly, 2 = every 2 weeks, 4 = monthly
  const days = [];
  const d = new Date();
  const month = d.getMonth();
  const year = d.getFullYear();
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    if (date.getDay() === weekDay) {
      days.push(new Date(date).toISOString().split('T')[0]);
    }
    date.setDate(date.getDate() + 1);
  }
  if (+payperiod === 1) {
    const temp = days.filter((day) => {
      return day >= d.toISOString().split('T')[0];
    });
    return temp[0];
  } else if (+payperiod === 2) {
    const pay2 = [days[1], days[days.length - 1]];
    const temp = pay2.filter((day) => {
      return day >= d.toISOString().split('T')[0];
    });
    return temp[0];
  } else {
    return days[days.length - 1];
  }
};
export const getPayDate = () => {
  const d = new Date();
  var day = d.getDay() || 7;
  if (day !== 1) d.setHours(-24 * (day - 1));
  return d;
};
export const parseAccordionData = (data) => {
  const items = [];
  console.log('check PayrollStaffDetail.js this does not return exact order of data');
  for (const [key, value] of Object.entries(data)) {
    let temp = [];
    let total = 0;
    let tips = 0;
    value.map((item) => {
      total += item.total * 100;
      tips += item.additional * 100;
      temp.push(item);
    });
    items.push({ title: key, data: temp, total, tips });
  }
  return items;
};
export const parseAccordionData2 = (data) => {
  const items = [];
  for (const item of data) {
    let temp = [];
    let total = 0;
    let tips = 0;
    item.data.map((item) => {
      total += item.total * 100;
      tips += item.additional * 100;
      temp.push(item);
    });
    items.push({ title: item.date, data: temp, total, tips });
  }
  return items;
};
export default {
  formatPhoneNumber,
  parseReduceData,
  formatPrice,
  imageUrlToBase64,
  parseEvents,
  tableRows,
  parseStrapiBooking,
  getPayDate,
  getMonday,
  parseAccordionData2,
};
