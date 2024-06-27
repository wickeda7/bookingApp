import { createContext, useEffect, useState, useContext } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import { requestBluetoothPermissions } from '@utils/Permissions';

export const manager = new BleManager();
const SERVICE_UUID = '0000180d-0000-1000-8000-00805f9b34fb'; // Replace with your service UUID
const CHARACTERISTIC_UUID = '00002a37-0000-1000-8000-00805f9b34fb'; // Replace with your characteristic UUID

const AdminContext = createContext({});

const AdminContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [imageType, setImageType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [storeInfo, setStoreInfo] = useState({});
  const [storeServices, setStoreServices] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [amountPerTurn, setAmountPerTurn] = useState(null);
  const [setTurn, setSetTurn] = useState(null);
  const [newService, setNewService] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [device, setDevice] = useState(null);
  const [receivedData, setReceivedData] = useState('');
  const [messageToSend, setMessageToSend] = useState('');

  let subOnDisconnected = null;

  useEffect(() => {
    if (!manager) return;
    const initBluetooth = async () => {
      const granted = await requestBluetoothPermissions();
      if (!granted) {
        Alert.alert('Permission denied', 'Bluetooth permissions are required to use this app.');
        return;
      }
      console.log('Bluetootn');
      manager.start({ showAlert: false });

      const subscription = manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          console.log('Bluetooth is on');
          // scanAndConnect();
        }
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

  const value = {
    visible,
    setVisible,
    imageType,
    setImageType,
    selectedImage,
    setSelectedImage,
    storeInfo,
    setStoreInfo,
    storeServices,
    setStoreServices,
    categoryId,
    setCategoryId,
    subCategoryId,
    setSubCategoryId,
    amountPerTurn,
    setAmountPerTurn,
    setTurn,
    setSetTurn,
    newService,
    setNewService,
    isConnected,
    setIsConnected,
    receivedData,
    setMessageToSend,
    sendData,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
export default AdminContextProvider;
export const useAdminContext = () => useContext(AdminContext);
