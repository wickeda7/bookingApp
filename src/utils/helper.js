import { createIconSetFromFontello } from 'react-native-vector-icons';
import moment from 'moment';
import tableMap from '@constants/map';
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
export const parseEvents = (data) => {
  if (data.length === 0) return [];
  const EVENT_COLOR = '#e6add8';
  const today = new Date();
  return data.reduce((acc, item) => {
    const date = item.date;
    const time = item.specialist.userInfo.hours.find((hour) => +hour.id === item.timeslot);
    const temp = time.hours.split(' - ');
    const startTime = temp[0];
    const endTime = temp[1];
    const services = typeof item.services === 'object' ? item.services : JSON.parse(item.services);
    acc.push({
      id: item.id,
      title: `${item.client.userInfo.firstName} ${item.client.userInfo.lastName}`,
      start: moment(`${date} ${startTime}`, 'YYYY-MM-DD h:m A').format('YYYY-MM-DD HH:mm'),
      end: moment(`${date} ${endTime}`, 'YYYY-MM-DD h:m A').format('YYYY-MM-DD HH:mm'),
      summary: services[0].name,
      color: EVENT_COLOR,
    });
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
  const temp = hours.find((hour) => +hour.id === timeslot);
  let hour = temp.hours.split('-');
  time = hour[0];
  return time;
};
export default { formatPhoneNumber, parseReduceData, formatPrice, imageUrlToBase64, parseEvents, tableRows };
