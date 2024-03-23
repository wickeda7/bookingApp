import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Style from '@theme/style';
import moment from 'moment';
const EventView = ({ item }) => {
  const { title, start, end, summary, id, timeslot, canceled } = item;
  const bookingType = timeslot ? 'Appointment' : 'Walkin';
  return (
    <View style={{ position: 'relative' }}>
      {canceled && (
        <View
          style={[
            {
              position: 'absolute',
              right: 0,
              top: '40%',
            },
            Style.canceledContainer,
          ]}
        >
          <Text style={[Style.canceledText]}>Canceled</Text>
        </View>
      )}
      <Text>
        {bookingType} - {title} {id}
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
