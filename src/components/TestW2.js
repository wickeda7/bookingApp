import {
  PermissionsAndroid,
  Platform,
  View,
  Button,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import { Buffer } from 'buffer';
import { requestBluetoothPermissions } from '@utils/Permissions';
export const manager = new BleManager();
const TestW2 = () => {
  const [device, setDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [receivedData, setReceivedData] = useState('');
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [messageToSend, setMessageToSend] = useState('');

  useEffect(() => {
    const initBluetooth = async () => {
      const granted = await requestBluetoothPermissions();
      if (!granted) {
        Alert.alert('Permission denied', 'Bluetooth permissions are required to use this app.');
        return;
      }

      // Initialize Bluetooth manager
      manager.start({ showAlert: false });

      // Check if Bluetooth is enabled
      const isEnabled = await manager.isAdapterEnabled();
      setIsBluetoothEnabled(isEnabled);

      // Listen to Bluetooth state changes
      const subscription = manager.onStateChange((state) => {
        setIsBluetoothEnabled(state === 'PoweredOn');
      }, true);

      return () => {
        subscription.remove();
      };
    };

    initBluetooth();

    return () => {
      manager.stopDeviceScan();
    };
  }, [manager]);

  useEffect(() => {
    console.log('connectedDevice useEffect');
    if (connectedDevice === null) {
      return;
    }
    console.log('connectedDevice', connectedDevice);
    setupNotification();
  }, [connectedDevice]);

  const startScan = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Scan error:', error);
        manager.stopDeviceScan();
        return;
      }

      if (device && device.name === 'My BLE Device') {
        connect(device);
        manager.stopDeviceScan();
      }
    });
  };

  const connect = (device) => {
    try {
      manager
        .connectToDevice(device.id)
        .then((device) => {
          setDevice(device);
          return device.discoverAllServicesAndCharacteristics();
        })
        .then(async (device) => {
          setIsConnected(true);
          const services = await device.services();
          services.forEach(async (service) => {
            const characteristics = await device.characteristicsForService(service.uuid);
            characteristics.forEach((ch) => {
              if (ch.isNotifiable && ch.isReadable && ch.isWritableWithResponse) {
                console.log('setConnectedDevice:!!!!!!!!');
                setConnectedDevice({
                  deviceid: device.id,
                  serviceUUID: service.uuid,
                  characteristicsUUID: ch.uuid,
                });
              }
            });
          });
        })
        .then((device) => {})
        .catch((error) => {
          console.error(error);
          Alert.alert('Connection error', error.message);
        });
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  const setupNotification = () => {
    try {
      console.log('setupNotification', connectedDevice);
      if (!device && !connectedDevice) {
        Alert.alert('No device connected.');
        return;
      }
      device.monitorCharacteristicForService(
        connectedDevice.serviceUUID,
        connectedDevice.characteristicsUUID,
        (error, characteristic) => {
          if (error) {
            console.error(error);
            return;
          }
          var value = base64.decode(characteristic.value);
          const message = Buffer.from(characteristic.value, 'base64').toString('utf-8');
          console.log('base64 is', value);
          console.log('Data Read  Buffer:', message);
          console.log('raw Data:', characteristic.value);
          setReceivedData(characteristic.value);
        }
      );
    } catch (error) {
      console.error('Error setting up notification:', error);
    }
  };

  const sendData = () => {
    console.log('sendData', messageToSend);
    if (device && connectedDevice && messageToSend !== '') {
      const encodedData = Buffer.from(messageToSend, 'utf-8').toString('base64');
      device
        .writeCharacteristicWithResponseForService(
          connectedDevice.serviceUUID,
          connectedDevice.characteristicsUUID,
          encodedData
        )
        .then(() => {
          Alert.alert('Success', 'Data sent successfully');
        })
        .catch((error) => {
          console.error(error);
          Alert.alert('Send error', error.message);
        });
    } else {
      Alert.alert('Error', 'Device is not connected');
    }
  };

  const connect22 = (device) => {
    try {
      manager
        .connectToDevice(device.id)
        .then((device) => {
          setDevices(device);
          return device.discoverAllServicesAndCharacteristics();
        })
        .then(async (device) => {
          const services = await device.services();
          services.forEach(async (service) => {
            const characteristics = await device.characteristicsForService(service.uuid);
            characteristics.forEach((ch) => {
              if (ch.isNotifiable && ch.isReadable && ch.isWritableWithResponse) {
                console.log('setConnectedDevice:!!!!!!!!');
                setConnectedDevice({
                  deviceid: device.id,
                  serviceUUID: service.uuid,
                  characteristicsUUID: ch.uuid,
                  device: device,
                });
              }

              handleRetrieveData(service.uuid, ch.uuid, device);
            });
          });
        })
        .catch((error) => {
          console.error('Connection error:', error);
        });
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };
  const handleRetrieveData = async (uuid, chuuid, device) => {
    try {
      device.readCharacteristicForService(uuid, chuuid).then((data) => {
        try {
          var value = base64.decode(data.value); // base64 is import from "react-native-base64" library for convert the base64 format to human readable strin

          const message = Buffer.from(data.value, 'base64').toString('utf-8');
          console.log('base64 is', value);
          console.log('Data Read  Buffer:', message);
          console.log('Data Read from the BLE device base64:', data.value, data);
        } catch (error) {
          console.log('error decode', error);
        }
        g;
      });
      console.log('connectedDevice', connectedDevice);
      // const readData = await manager
      //   .ReadCharacteristicForDevice(
      //     '4D:E6:38:F4:CB:EE',
      //     '00001801-0000-1000-8000-00805f9b34fb',
      //     '00002a05-0000-1000-8000-00805f9b34fb'
      //   )
      //   .then((readData) => {
      //     console.log('Data Read from the BLE device:', readData);
      //   })
      //   .catch((error) => {
      //     console.log('“Error while reading data from BLE device:”', error);
      //   });
    } catch (error) {
      console.log('Error reading data from BLE device:', error);
    }
  };
  const sendMessage = () => {
    console.log('sendMessage', messageToSend);
    return;
    if (!connectedDevice) {
      console.log('No device connected.');
      return;
    }

    const message = messageToSend.trim();
    if (message.length === 0) {
      console.log('Message cannot be empty.');
      return;
    }

    const serviceUUID = 'YOUR_SERVICE_UUID';
    const characteristicUUID = 'YOUR_CHARACTERISTIC_UUID';

    // manager.writeWithoutResponse(connectedDevice.id, serviceUUID, characteristicUUID, messageToSend)
    //   .then(() => {
    //     console.log('Message sent:', messageToSend);
    //     // Optionally, update UI or clear message input
    //     setMessageToSend('');
    //   })
    //   .catch((error) => {
    //     console.error('Write error:', error);
    //   });
    manager
      .write(connectedDevice.id, serviceUUID, characteristicUUID, messageToSend)
      .then(() => {
        console.log('Message sent:', messageToSend);
        // Optionally, update UI or clear message input
        setMessageToSend('');
      })
      .catch((error) => {
        console.error('Write error:', error);
      });
  };
  const stopScan = () => {
    manager.stopDeviceScan();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
      <Text>Status: {isConnected ? 'Connected' : 'Disconnected'}</Text>

      <Button title='Start Scan' onPress={startScan} />
      <View style={{ marginTop: 20 }}>
        <Button title='Stop Scan' onPress={stopScan} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title='View Message' onPress={handleRetrieveData} />
      </View>
      <View style={{ marginTop: 20 }}>
        {/* {devices.map((device) => (
          <Button key={device.id} title={`${device.name || device.id}`} onPress={() => connectToDevice(device)} />
        ))} */}
      </View>
      <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
          value={messageToSend}
          onChangeText={(val) => {
            setMessageToSend(val);
          }}
          placeholder='Enter message to send'
        />
        <Button title='Send Message' onPress={sendData} />
      </View>
      <View style={{ marginTop: 20, flex: 1 }}>
        <Text>Received Messages: {receivedData}</Text>
      </View>
    </View>
  );
};

export default TestW2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginVertical: 50,
  },
  button: { margin: 10 },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
