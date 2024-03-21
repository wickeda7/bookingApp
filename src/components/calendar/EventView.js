import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import moment from 'moment';
const EventView = ({ item }) => {
  const { title, start, end, summary, id, timeslot, canceled } = item;
  const bookingType = timeslot ? 'Appointment' : 'Walkin';
  return (
    <View>
      <Text>
        {bookingType} - {title} {canceled ? 'Canceled' : 'Confirmed'}
      </Text>
      <Text>{summary}</Text>
      <Text>
        {moment(start).format('h:mm A')} - {moment(end).format('h:mm A')}
      </Text>
    </View>
  );
};

export default EventView;

const styles = StyleSheet.create({});
