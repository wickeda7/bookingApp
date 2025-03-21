export const feesAmount = 2;
export const SERVICE_UUID = '0000180d-0000-1000-8000-00805f9b34fb';
export const CHARACTERISTIC_UUID = '00002a37-0000-1000-8000-00805f9b34fb';
export const deviceName = 'BLE FRONT';
export const STATES = [
  { label: 'AL', value: 'AL' },
  { label: 'AK', value: 'AK' },
  { label: 'AS', value: 'AS' },
  { label: 'AZ', value: 'AZ' },
  { label: 'AR', value: 'AR' },
  { label: 'CA', value: 'CA' },
  { label: 'CO', value: 'CO' },
  { label: 'CT', value: 'CT' },
  { label: 'DE', value: 'DE' },
  { label: 'DC', value: 'DC' },
  { label: 'FM', value: 'FM' },
  { label: 'FL', value: 'FL' },
  { label: 'GA', value: 'GA' },
  { label: 'GU', value: 'GU' },
  { label: 'HI', value: 'HI' },
  { label: 'ID', value: 'ID' },
  { label: 'IL', value: 'IL' },
  { label: 'IN', value: 'IN' },
  { label: 'IA', value: 'IA' },
  { label: 'KS', value: 'KS' },
  { label: 'KY', value: 'KY' },
  { label: 'LA', value: 'LA' },
  { label: 'ME', value: 'ME' },
  { label: 'MH', value: 'MH' },
  { label: 'MD', value: 'MD' },
  { label: 'MA', value: 'MA' },
  { label: 'MI', value: 'MI' },
  { label: 'MN', value: 'MN' },
  { label: 'MS', value: 'MS' },
  { label: 'MO', value: 'MO' },
  { label: 'MT', value: 'MT' },
  { label: 'NE', value: 'NE' },
  { label: 'NV', value: 'NV' },
  { label: 'NH', value: 'NH' },
  { label: 'NJ', value: 'NJ' },
  { label: 'NM', value: 'NM' },
  { label: 'NY', value: 'NY' },
  { label: 'NC', value: 'NC' },
  { label: 'ND', value: 'ND' },
  { label: 'MP', value: 'MP' },
  { label: 'OH', value: 'OH' },
  { label: 'OK', value: 'OK' },
  { label: 'OR', value: 'OR' },
  { label: 'PW', value: 'PW' },
  { label: 'PA', value: 'PA' },
  { label: 'PR', value: 'PR' },
  { label: 'RI', value: 'RI' },
  { label: 'SC', value: 'SC' },
  { label: 'SD', value: 'SD' },
  { label: 'TN', value: 'TN' },
  { label: 'TX', value: 'TX' },
  { label: 'UT', value: 'UT' },
  { label: 'VT', value: 'VT' },
  { label: 'VI', value: 'VI' },
  { label: 'VA', value: 'VA' },
  { label: 'WA', value: 'WA' },
  { label: 'WV', value: 'WV' },
  { label: 'WI', value: 'WI' },
  { label: 'WY', value: 'WY' },
];

// 60,000 x (60/100) = 36,000, 60,000 x (40/100) = 24,000 example of 60/40
export const totalDeduct = [
  { label: 'NONE', value: '' },
  { label: '60/40', value: '60/40' },
  { label: '50/50', value: '50/50' },
  { label: '55/45', value: '55/45' },
];
export const tipDeduct = [
  { label: 'NONE', value: '' },
  { label: '5%', value: '5' },
  { label: '10%', value: '10' },
  { label: '15%', value: '15' },
];

export const storeHours = [
  { day: 'Monday', hours: 'Closed' },
  { day: 'Tuesday', hours: 'Closed' },
  { day: 'Wednesday', hours: 'Closed' },
  { day: 'Thursday', hours: 'Closed' },
  { day: 'Friday', hours: 'Closed' },
  { day: 'Saturday', hours: 'Closed' },
  { day: 'Sunday', hours: 'Closed' },
];

export const weekDays = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' },
];

export const weekDaysObj = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};
