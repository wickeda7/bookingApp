import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import Style from '@theme/style';
import { Default, Fonts, Colors } from '@constants/style';
import MyStatusBar from '@components/myStatusBar';
import { useState } from 'react';
import { cloneDeep } from '@utils/helper';
import BleDevice from '@components/devices/BleDevice';
import { BLEService } from '@services/BLEService';
import DeviceScreen from './DeviceScreen';

const MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS = 5000;
const Devices = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [foundDevices, setFoundDevices] = useState([]);
  const [screen, setScreen] = useState('DASHBOARD_SCREEN');
  const [connectedDevice, setConnectedDevice] = useState(null);
  const addFoundDevice = (device) =>
    setFoundDevices((prevState) => {
      if (!isFoundDeviceUpdateNecessary(prevState, device)) {
        return prevState;
      }
      // deep clone
      const nextState = cloneDeep(prevState);
      const extendedDevice = {
        ...device,
        updateTimestamp: Date.now() + MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS,
      };

      const indexToReplace = nextState.findIndex((currentDevice) => currentDevice.id === device.id);
      if (indexToReplace === -1) {
        return nextState.concat(extendedDevice);
      }
      nextState[indexToReplace] = extendedDevice;
      return nextState;
    });
  const isFoundDeviceUpdateNecessary = (currentDevices, updatedDevice) => {
    const currentDevice = currentDevices.find(({ id }) => updatedDevice.id === id);
    if (!currentDevice) {
      return true;
    }
    return currentDevice.updateTimestamp < Date.now();
  };

  const onConnectSuccess = () => {
    const connectedDevice = BLEService.getDevice();
    setConnectedDevice(connectedDevice);
    //navigation.navigate('DEVICE_DETAILS_SCREEN');
    setScreen('DEVICE_DETAILS_SCREEN');
    setIsConnecting(false);
  };

  const onConnectFail = (error) => {
    console.log('onConnectFail', error);
    setIsConnecting(false);
  };

  const deviceRender = (device) => (
    <BleDevice
      onPress={(pickedDevice) => {
        setIsConnecting(true);
        console.log('pickedDevice');
        BLEService.connectToDevice(pickedDevice)
          .then(onConnectSuccess)
          .catch((error) => {
            onConnectFail(error);
          });
      }}
      key={device.id}
      device={device}
    />
  );

  return (
    <KeyboardAvoidingView style={Style.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <MyStatusBar />
      <View
        style={{
          marginVertical: 50,
          marginHorizontal: 20,
          flex: 1,
          flexDirection: 'row',
          borderBlockColor: 'red',
          borderWidth: 1,
        }}
      >
        {isConnecting && (
          <View style={styles.dropDown}>
            <Text style={{ fontSize: 20, color: 'white' }}>Connecting.......</Text>
          </View>
        )}
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{ fontSize: 16 }}>Screen: {screen}</Text>
          {connectedDevice?.id && (
            <>
              <Text style={{ fontSize: 16 }}>Connected device ID: {connectedDevice.id}</Text>
              <Text style={{ fontSize: 16 }}>Connected device Name: {connectedDevice.name}</Text>
            </>
          )}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setFoundDevices([]);
              BLEService.initializeBLE().then(() => BLEService.scanDevices(addFoundDevice, null, true));
            }}
          >
            <Text style={{ fontSize: 16, color: 'white' }}>Look for devices</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setFoundDevices([]);
              BLEService.initializeBLE().then(() => BLEService.scanDevices(addFoundDevice, null, false));
            }}
          >
            <Text style={{ fontSize: 16, color: 'white' }}>Look for devices (legacy off)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={BLEService.requestBluetoothPermission}>
            <Text style={{ fontSize: 16, color: 'white' }}>Ask for permissions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={BLEService.requestBluetoothPermission}>
            <Text style={{ fontSize: 16, color: 'white' }}>Go to nRF test</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => BLEService.isDeviceWithIdConnected('asd')}>
            <Text style={{ fontSize: 16, color: 'white' }}>Call disconnect with wrong id</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('DEVICE_CONNECT_DISCONNECT_TEST_SCREEN')}
          >
            <Text style={{ fontSize: 16, color: 'white' }}>Connect/disconnect test</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('INSTANCE_DESTROY_SCREEN')}>
            <Text style={{ fontSize: 16, color: 'white' }}>instance destroy screen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('DEVICE_ON_DISCONNECT_TEST_SCREEN')}>
            <Text style={{ fontSize: 16, color: 'white' }}>On disconnect test</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3, flexDirection: 'column' }}>
          {screen === 'DASHBOARD_SCREEN' && (
            <FlatList
              style={{ flex: 1 }}
              data={foundDevices}
              renderItem={({ item }) => deviceRender(item)}
              keyExtractor={(device) => device.id}
            />
          )}
          {screen === 'DEVICE_DETAILS_SCREEN' && <DeviceScreen BLEService={BLEService} />}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Devices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropDown: {
    zIndex: 100,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#00000066',
    alignItems: 'center',
    justifyContent: 'center',
  },
  devicesList: { flex: 1 },
  btn: {
    backgroundColor: Colors.info,
    padding: 12,
    marginVertical: 5,
    borderRadius: 100,
    alignItems: 'center',
  },
});
