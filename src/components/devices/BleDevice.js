import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Device } from 'react-native-ble-plx';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import DeviceProperty from './DeviceProperty';

const BleDevice = ({ device, onPress }) => {
  const isConnectableInfoValueIsUnavailable = device.isConnectable;
  const isConnectableValue = device.isConnectable ? 'true' : 'false';
  const parsedIsConnectable = isConnectableInfoValueIsUnavailable ? '-' : isConnectableValue;
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(device)}>
      <DeviceProperty name='name' value={device.name} />
      <DeviceProperty name='localName' value={device.localName} />
      <DeviceProperty name='id' value={device.id} />
      <DeviceProperty name='manufacturerData' value={device.manufacturerData} />
      <DeviceProperty name='rawScanRecord' value={device.rawScanRecord} />
      <DeviceProperty name='isConnectable' value={parsedIsConnectable} />
      <DeviceProperty name='mtu' value={device.mtu.toString()} />
      <DeviceProperty name='rssi' value={device.rssi} />
    </TouchableOpacity>
  );
};

export default BleDevice;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.info,
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  textSmall: {
    fontSize: 16,
  },
});
