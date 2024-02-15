import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts, calendarTheme } from '@constants/style';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useBookingContext } from '@contexts/BookingContext';
import moment from 'moment';
import { use } from 'i18next';
const CalendarComponent = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { setSelectedDate } = useBookingContext();
  const today = moment().format('YYYY-MM-DD');
  ///https://wix.github.io/react-native-calendars/docs/Components/Calendar
  const [selected, setSelected] = useState('');
  useEffect(() => {
    setSelectedDate(today);
  }, []);
  function tr(key) {
    return t(`scheduleScreen:${key}`);
  }
  return (
    <View>
      <Text
        style={{
          ...Fonts.Black16Bold,
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding,
        }}
      >
        {tr('date')}
      </Text>
      <View
        style={{
          marginHorizontal: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
          borderRadius: 20,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day);
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'red' },
          }}
          theme={calendarTheme}
        />
      </View>
    </View>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({});
