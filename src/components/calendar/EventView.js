import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Style from '@theme/style';
import moment from 'moment';
import FontIcon from 'react-native-vector-icons/FontAwesome';
const EventView = ({ item }) => {
  const { title, start, end, summary, id, timeslot, canceled, confirmed } = item;
  const bookingType = timeslot ? 'Appointment' : 'Walkin';
  return (
    <View style={{ position: 'relative' }}>
      {confirmed && (
        <View style={[{ position: 'absolute', right: -45, top: 0 }]}>
          <FontIcon name='check-circle' size={20} color='green' />
        </View>
      )}
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
