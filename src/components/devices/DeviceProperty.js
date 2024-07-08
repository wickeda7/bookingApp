import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DeviceProperty = ({ name, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{name}:</Text>
      <Text style={styles.textValue}>{value || '-'}</Text>
    </View>
  );
};

export default DeviceProperty;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textTitle: {
    fontWeight: '800',
  },
  textValue: {
    fontWeight: '500',
  },
});
