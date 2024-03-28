import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import { calendarTheme } from '@constants/style';
import { ExpandableCalendar, AgendaList, CalendarProvider } from 'react-native-calendars';
import { useAuthContext } from '@contexts/AuthContext';
import AgendaItem from '@components/calendar/AgendaItem';
import { getMonday } from '@utils/helper';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getWeeklyInvoice } from '@redux/actions/staffAction';
import Loader from '@components/loader';
const DayCalendar = () => {
  const { userData } = useAuthContext();
  const dispatch = useDispatch();
  const { weeklyInvoice, isLoading } = useSelector((state) => state.staff);
  const monday = getMonday().toISOString().split('T')[0];
  const nextMonday = moment(monday).add(7, 'days').toDate().toISOString().split('T')[0];
  const userId = userData?.id;
  const storeId = userData?.storeEmployee?.id;
  useEffect(() => {
    dispatch(getWeeklyInvoice({ from: monday, to: nextMonday, userId, storeId }));
  }, []);

  const getMarkedDates = () => {
    if (weeklyInvoice.length === 0) return {};
    const marked = {};
    weeklyInvoice.forEach((item) => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0) {
        marked[item.title] = { marked: true };
      } else {
        marked[item.title] = { disabled: true };
      }
    });
    return marked;
  };
  const marked = useRef(getMarkedDates());
  const onDateChanged = (date, source) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
  };
  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <>
      <Loader visible={isLoading} />

      <CalendarProvider date={weeklyInvoice[0]?.title} onDateChanged={onDateChanged} showTodayButton>
        <ExpandableCalendar firstDay={1} markedDates={marked.current} theme={calendarTheme} />
        <AgendaList sections={weeklyInvoice} renderItem={renderItem} sectionStyle={styles.section} />
      </CalendarProvider>
    </>
  );
};

export default DayCalendar;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: 'lightgrey',
  },
  section: {
    backgroundColor: '#f2f7f7',
    color: 'grey',
    textTransform: 'capitalize',
  },
});
