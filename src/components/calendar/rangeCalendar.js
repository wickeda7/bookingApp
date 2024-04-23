import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { CalendarList, Calendar } from 'react-native-calendars';
import { Colors, Fonts, Default, calendarTheme } from '@constants/style';
import { useTranslation } from 'react-i18next';
import XDate from 'xdate';
import moment from 'moment';
const RANGE = 24;
const now = moment().format('YYYY-MM-DD');
const RangeCalendar = ({ setSelectedDate }) => {
  const [state, setState] = useState({
    isFromDatePicked: false,
    isToDatePicked: false,
    markedDates: {},
    fromDate: '',
    toDate: '',
  });

  useEffect(() => {
    if (state.toDate === '') return;
    setSelectedDate({ from: state.fromDate, to: state.toDate });
  }, [state.toDate]);

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`incomeScreen:${key}`);
  }

  const onDayPress = (day) => {
    if (!state.isFromDatePicked || (state.isFromDatePicked && state.isToDatePicked)) {
      setupStartMarker(day);
    } else if (!state.isToDatePicked) {
      let markedDates = { ...state.markedDates };
      let [mMarkedDates, range] = setupMarkedDates(state.fromDate, day.dateString, markedDates);
      if (range >= 0) {
        setState({
          ...state,
          isFromDatePicked: true,
          isToDatePicked: true,
          markedDates: mMarkedDates,
          fromDate: state.fromDate,
          toDate: day.dateString,
        });
      } else {
        setupStartMarker(day);
      }
    }
  };
  const setupMarkedDates = (fromDate, toDate, markedDates) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        // markedDates = {
        //   [toDate]: {
        //     startingDay: true,
        //     endingDay: true,
        //     color: Colors.primary,
        //     textColor: Colors.white,
        //   },
        // };
      } else {
        for (let i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            markedDates[tempDate] = { color: Colors.mediumPrimary, textColor: Colors.white };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: Colors.primary,
              textColor: Colors.white,
            };
          }
        }
      }
    }
    return [markedDates, range];
  };
  const setupStartMarker = (day) => {
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        color: Colors.primary,
        textColor: Colors.white,
      },
    };
    setState({
      ...state,
      isFromDatePicked: true,
      isToDatePicked: false,
      markedDates: markedDates,
      fromDate: day.dateString,
      toDate: '',
    });
  };

  return (
    <>
      <CalendarList
        onDayPress={onDayPress}
        markedDates={state.markedDates}
        theme={calendarTheme}
        horizontal={true}
        style={{ height: 310 }}
        firstDay={1}
        markingType={'period'}
        current={now}
        //minDate={moment().format('YYYY-MM-DD')}
        pastScrollRange={RANGE}
        futureScrollRange={RANGE}
        hideArrows={false}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding * 1.5,
        }}
      >
        <Text>{tr('incomeRangeDesc')}</Text>
      </View>
    </>
  );
};

export default RangeCalendar;

const styles = StyleSheet.create({});
