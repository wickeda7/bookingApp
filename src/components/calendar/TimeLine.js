import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';
import find from 'lodash/find';
import { ExpandableCalendar, TimelineList, CalendarProvider, CalendarUtils, Timeline } from 'react-native-calendars';
import { calendarTheme } from '@constants/style';
import { parseEvents } from '@utils/helper';
import EventView from './EventView';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const INITIAL_TIME = { hour: 9, minutes: 0 };
const today = new Date();

const TimeLine = (props) => {
  const { data, navigation } = props;
  const [marked, setMarked] = useState({});
  const [event, setEvent] = useState([]);
  const { isLoading, userBookings } = useSelector((state) => state.booking);
  useEffect(() => {
    const marked = groupBy(data, (event) => CalendarUtils.getCalendarDateString(event.date));
    for (let item of Object.keys(marked)) {
      marked[item] = { marked: true };
    }
    setMarked(marked);
    const events = parseEvents(data);
    if (events.length === 0) return;
    setEvent({
      currentDate: moment(today).format('YYYY-MM-DD'),
      events: events,
      eventsByDate: groupBy(events, (event) => CalendarUtils.getCalendarDateString(event.start)),
    });
  }, [data]);
  const onEventPress = (event) => {
    navigation.push('StoresStack', { screen: 'bookingDetail', params: { bookingId: event.id } });
  };

  const onDateChanged = (date, source) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    const newEvent = { ...event, currentDate: date };
    setEvent(newEvent);
  };
  const onMonthChange = (month, updateSource) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };
  const createNewEvent = (timeString, timeObject) => {
    console.log('createNewEvent', timeString, timeObject);
    const { eventsByDate } = event;
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, '0')}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;

    const newEvent = {
      id: 'draft',
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: 'New Event',
      color: 'white',
    };

    if (timeObject.date) {
      if (eventsByDate[timeObject.date]) {
        eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date], newEvent];
        const newEvent = { ...event, eventsByDate: eventsByDate };
        setEvent(newEvent);
      } else {
        eventsByDate[timeObject.date] = [newEvent];
        const newEvent = { ...event, eventsByDate: eventsByDate };
        setEvent(newEvent);
      }
    }
  };
  const approveNewEvent = (_timeString, timeObject) => {
    const { eventsByDate } = event;

    Alert.prompt('New Event', 'Enter event title', [
      {
        text: 'Cancel',
        onPress: () => {
          if (timeObject.date) {
            eventsByDate[timeObject.date] = filter(eventsByDate[timeObject.date], (e) => e.id !== 'draft');
            const newEvent = { ...event, eventsByDate: eventsByDate };
            setEvent(newEvent);
          }
        },
      },
      {
        text: 'Create',
        onPress: (eventTitle) => {
          if (timeObject.date) {
            const draftEvent = find(eventsByDate[timeObject.date], { id: 'draft' });
            if (draftEvent) {
              draftEvent.id = undefined;
              draftEvent.title = eventTitle ?? 'New Event';
              draftEvent.color = 'lightgreen';
              eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date]];
              const newEvent = { ...event, eventsByDate: eventsByDate };
              setEvent(newEvent);
            }
          }
        },
      },
    ]);
  };
  const timelineProps = {
    format24h: false,
    //onBackgroundLongPress: createNewEvent,
    // onBackgroundLongPressOut: approveNewEvent,
    unavailableHours: [
      { start: 0, end: 8 },
      { start: 22, end: 23 },
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
    onEventPress: onEventPress,
  };
  const renderItem = (timelineProps, info) => {
    return <Timeline {...timelineProps} renderEvent={(item) => <EventView item={item} />} />;
  };
  if (event.length === 0) return null;
  return (
    <CalendarProvider
      date={event.currentDate}
      onDateChanged={onDateChanged}
      //onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
    >
      <ExpandableCalendar firstDay={1} markedDates={marked} theme={calendarTheme} />
      <TimelineList
        events={event.eventsByDate}
        timelineProps={timelineProps}
        showNowIndicator
        // scrollToNow
        scrollToFirst
        initialTime={{ hour: 9, minutes: 0 }}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </CalendarProvider>
  );
};

export default TimeLine;

const styles = StyleSheet.create({});
