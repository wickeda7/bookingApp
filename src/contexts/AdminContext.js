import { createContext, useEffect, useState, useContext } from 'react';
import { BleManager } from 'react-native-ble-plx';

import { requestBluetoothPermissions } from '@utils/Permissions';
import Toast from 'react-native-root-toast';
import { Colors } from '@constants/style';
import { TextEncoder } from 'text-encoding';
import { Buffer } from 'buffer';

export const manager = new BleManager();
const SERVICE_UUID = '0000180d-0000-1000-8000-00805f9b34fb'; // Replace with your service UUID
const CHARACTERISTIC_UUID = '00002a37-0000-1000-8000-00805f9b34fb'; // Replace with your characteristic UUID
const END_OF_DATA = 'END_OF_DATA';
let connectOptions = {
  requestMTU: 512,
};
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

  const [isConnected, setIsConnected] = useState(false); // device is connected or not
  const [device, setDevice] = useState(null);
  const [receivedData, setReceivedData] = useState(null);
  const [totalView, setTotalView] = useState(false); /// totalView is showing or not
  let messageToSend = null;

  let subOnDisconnected = null;
  let moniterCharacteristic = null;

  useEffect(() => {
    if (!manager) return;
    const initBluetooth = async () => {
      const granted = await requestBluetoothPermissions();
      if (!granted) {
        showToast(`Permission denied: Bluetooth permissions are required to use this app.`, Colors.red);
        return;
      }
    };

    initBluetooth();

    return () => {
      // subscription.remove();
      subOnDisconnected && subOnDisconnected.remove();
      moniterCharacteristic && moniterCharacteristic.remove();
      manager.stopDeviceScan();
      manager.destroy();
    };
  }, [manager]);

  const showToast = (message, color) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: color,
      // onHidden: () => {
      //   setAccessCode(false);
      // },
    });
  };

  const negotiateMTUSize = async (device, mtuSize) => {
    try {
      const mtu = await device.requestMTU(mtuSize);
    } catch (error) {
      console.error('Error negotiating MTU size:', error);
    }
  };

  const startScan = (data) => {
    messageToSend = data;

    if (isConnected) {
      sendData(device);
      return;
    }

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        showToast(`Scan error: ${error}`, Colors.red);
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
        .then(async () => {
          await negotiateMTUSize(device, 517);
        })
        .then(() => {
          sendData(device);
        })
        .catch((error) => {
          console.log(`Connection error: ${error.message}`);
          showToast(`Connection error: ${error.message}`, Colors.red);
        });
    } catch (error) {
      console.error('Error connecting to device:', error);
      showToast(`Error connecting to device: ${error}`, Colors.red);
    }
  };

  const setupNotification = (device) => {
    try {
      moniterCharacteristic = device.monitorCharacteristicForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.error(error);
            showToast(` ${error}`, Colors.red);
            return;
          }

          const decodedData = Buffer.from(characteristic.value, 'base64').toString('utf-8');
          const data = JSON.parse(decodedData);

          if ('totalView' in data) {
            setTotalView(data.totalView);
          } else {
            setTotalView(true);
            setReceivedData(data);
          }
        }
      );
    } catch (error) {
      console.error(`Notification error: ${error.message}`);
    }
  };

  const setupDisconnectListener = (device) => {
    subOnDisconnected = device.onDisconnected((error, disconnectedDevice) => {
      if (error) {
        console.error(error);
        showToast(` ${error}`, Colors.red);
      } else {
        setIsConnected(false);
        setTotalView(false);
        setDevice(null);
        showToast('Connection to the server has been lost.', Colors.red);
      }
    });
  };
  const sendData = async (device) => {
    try {
      const jsonString = JSON.stringify(messageToSend);
      const bytes = new TextEncoder().encode(jsonString);
      const mtuSize = 517;
      const chunkSize = mtuSize - 3; // Subtract 3 bytes for the ATT protocol header
      const chunks = [];
      for (let i = 0; i < bytes.length; i += chunkSize) {
        chunks.push(bytes.slice(i, i + chunkSize));
      }
      console.log('sendData chunks');
      for (const chunk of chunks) {
        await device.writeCharacteristicWithoutResponseForService(
          SERVICE_UUID,
          CHARACTERISTIC_UUID,
          Buffer.from(chunk).toString('base64')
        );
      }
      // Send an end-of-data flag
      const endFlag = new TextEncoder().encode('END_OF_DATA');
      await device.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        Buffer.from(endFlag).toString('base64')
      );
    } catch (error) {
      console.error(`Send error: ${error.message}`);
    }
  };

  const disconnectFromDevice = async () => {
    await manager
      .cancelDeviceConnection(device.id)
      .then((device) => {
        console.log(' Disconnect success: ', device.id);
      })
      .catch((error) => {
        console.log(' Disconnect Failed: ', error);
      });
  };

  const stopScan = () => {
    setIsConnected(false);
    //manager.stopDeviceScan();
  };

  const convertToBase64 = (obj) => {
    const jsonString = JSON.stringify(obj) + END_OF_DATA;
    const bytes = new TextEncoder().encode(jsonString); // Convert to byte array
    return Buffer.from(bytes).toString('base64');
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
    startScan,
    receivedData,
    sendData,
    disconnectFromDevice,
    totalView,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
export default AdminContextProvider;
export const useAdminContext = () => useContext(AdminContext);
