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
import { Buffer } from 'buffer';
import { requestBluetoothPermissions } from '@utils/Permissions';
import { useAdminContext } from '@contexts/AdminContext';

export const manager = new BleManager();
const SERVICE_UUID = '0000180d-0000-1000-8000-00805f9b34fb'; // Replace with your service UUID
const CHARACTERISTIC_UUID = '00002a37-0000-1000-8000-00805f9b34fb'; // Replace with your characteristic UUID

const TestW2 = () => {
  const [device, setDevice] = useState(null);
  const [receivedData, setReceivedData] = useState('');
  const [messageToSend, setMessageToSend] = useState('');
  const { isConnected, setIsConnected } = useAdminContext();
  let subOnDisconnected = null;

  useEffect(() => {
    if (!manager) return;
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
        //startScan();
      }, true);

      return () => {
        subscription.remove();
      };
    };

    initBluetooth();

    return () => {
      subOnDisconnected && subOnDisconnected.remove();
      manager.stopDeviceScan();
      manager.destroy();
    };
  }, [manager]);

  const startScan = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Scan error:', error);
        manager.stopDeviceScan();
        return;
      }

      if (device && device.name === 'My BLE Device') {
        manager.stopDeviceScan();
        connect(device);
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
          setupNotification(device);
          setupDisconnectListener(device); // Setup listener for disconnection
        })

        .catch((error) => {
          console.error(error);
          Alert.alert('Connection error', error.message);
        });
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  const setupNotification = (device) => {
    device.monitorCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_UUID, (error, characteristic) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log('Data Read:', characteristic.value);
      const decodedData = Buffer.from(characteristic.value, 'base64').toString('utf-8');
      console.log('Data Read:', decodedData);
      setReceivedData(decodedData);
    });
  };

  const setupDisconnectListener = (device) => {
    subOnDisconnected = device.onDisconnected((error, disconnectedDevice) => {
      if (error) {
        console.error(error);
      } else {
        setIsConnected(false);
        setDevice(null);
        Alert.alert('Disconnected', 'Connection to the server has been lost.');
      }
    });
  };

  const sendData = () => {
    console.log('sendData', messageToSend);
    if (device && isConnected && messageToSend !== '') {
      const encodedData = Buffer.from(messageToSend, 'utf-8').toString('base64');
      device
        .writeCharacteristicWithResponseForService(SERVICE_UUID, CHARACTERISTIC_UUID, encodedData)
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
