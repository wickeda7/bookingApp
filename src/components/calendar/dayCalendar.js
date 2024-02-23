import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { calendarTheme } from '@constants/style';
import { ExpandableCalendar, AgendaList, CalendarProvider } from 'react-native-calendars';

import { agendaItems, getMarkedDates } from '@api/tempCalendarData';
import AgendaItem from '@components/calendar/AgendaItem';
const ITEMS = agendaItems;
const DayCalendar = () => {
  const marked = useRef(getMarkedDates());
  const onDateChanged = (date, source) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
  };
  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);
  return (
    <CalendarProvider
      date={ITEMS[1]?.title}
      onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      // disabledOpacity={0.6}
    >
      <ExpandableCalendar
        //testID={testIDs.expandableCalendar.CONTAINER}
        // horizontal={false}
        // hideArrows
        // disablePan
        // hideKnob
        // initialPosition={ExpandableCalendar.positions.OPEN}
        // calendarStyle={styles.calendar}
        // headerStyle={styles.header} // for horizontal only
        // disableWeekScroll
        // disableAllTouchEventsForDisabledDays
        firstDay={1}
        markedDates={marked.current}
        // animateScroll
        // closeOnDayPress={false}
        theme={calendarTheme}
      />
      <AgendaList
        sections={ITEMS}
        renderItem={renderItem}
        // scrollToNextEvent
        sectionStyle={styles.section}
        // dayFormat={'yyyy-MM-d'}
      />
    </CalendarProvider>
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
