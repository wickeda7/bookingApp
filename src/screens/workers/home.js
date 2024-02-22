import { Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';
import find from 'lodash/find';
import { ExpandableCalendar, TimelineList, CalendarProvider, CalendarUtils } from 'react-native-calendars';
import { Colors, Default, Fonts, calendarTheme } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useStoreContext } from '@contexts/StoreContext';
import { useAuthContext } from '@contexts/AuthContext';
import { useBookingContext } from '@contexts/BookingContext';
import { parseEvents } from '@utils/helper';
import Feather from 'react-native-vector-icons/Feather';

const INITIAL_TIME = { hour: 9, minutes: 0 };
const today = new Date();
const getDate = (offset = 0) => CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));
const WorkerHome = ({ props }) => {
  const { userData } = useAuthContext();
  const { t, i18n } = useTranslation();
  const { getUserBooking } = useBookingContext();
  const [data, setData] = useState([]);
  const [marked, setMarked] = useState({});
  const isRtl = i18n.dir() === 'rtl';
  const roleId = userData?.role.id || null; // 3 === worker, 1 === user, 4 === admin
  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  const [event, setEvent] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let res = await getUserBooking(false, 'specialist');
      setData(res);
    };
    getData();
  }, []);

  useEffect(() => {
    const marked = groupBy(data, (event) => CalendarUtils.getCalendarDateString(event.date));
    for (let item of Object.keys(marked)) {
      marked[item] = { marked: true };
    }
    setMarked(marked);
    const events = parseEvents(data);
    if (events.length === 0) return;
    setEvent({
      currentDate: getDate(),
      events: events,
      eventsByDate: groupBy(events, (event) => CalendarUtils.getCalendarDateString(event.start)),
    });
  }, [data]);
  const onEventPress = (event) => {
    const item = data.find((item) => item.id === event.id);
    // console.log('event pressed', item, data, event.id);
    props.navigation.push('StoresStack', { screen: 'bookingDetail', params: item });
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
  if (event.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Feather name='calendar' color={Colors.primary} size={50} />
        <Text
          style={{
            ...Fonts.Primary16Bold,
            marginVertical: Default.fixPadding,
          }}
        >
          {tr('noBooking')}
        </Text>
      </View>
    );
  return (
    <>
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
        }}
      >
        <Text>TODO: set up reminder for appointments</Text>
      </View>
      <CalendarProvider
        date={event.currentDate}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        // numberOfDays={3}
      >
        <ExpandableCalendar firstDay={1} markedDates={marked} theme={calendarTheme} />
        <TimelineList
          events={event.eventsByDate}
          timelineProps={timelineProps}
          showNowIndicator
          // scrollToNow
          scrollToFirst
          initialTime={INITIAL_TIME}
        />
      </CalendarProvider>
    </>
  );
};

export default WorkerHome;
