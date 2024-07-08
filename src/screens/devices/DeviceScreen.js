import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

const DeviceScreen = ({ BLEService }) => {
  const connectedDevice = BLEService.getDevice();
  console.log('connectedDevice', connectedDevice);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView>
        <Text>{JSON.stringify(connectedDevice, null, 4)}</Text>
      </ScrollView>
    </View>
  );
};

export default DeviceScreen;

const styles = StyleSheet.create({});
