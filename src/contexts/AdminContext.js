import { createContext, useEffect, useState, useContext } from 'react';

import Toast from 'react-native-root-toast';
import { Colors } from '@constants/style';
import { TextEncoder } from 'text-encoding';
import { Buffer } from 'buffer';
import { BLEService } from '@services/BLEService';
import { SERVICE_UUID, CHARACTERISTIC_UUID, deviceName } from '@constants/settings';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
  const [notificationNumber, setNotificationNumber] = useState(0);

  const [isConnected, setIsConnected] = useState(false); // device is connected or not
  const [device, setDevice] = useState(null);
  const [receivedData, setReceivedData] = useState(null);
  const [totalView, setTotalView] = useState(false); /// totalView is showing or not
  let moniterCharacteristic = null;
  let onDeviceDisconnectedSubscription = null;

  useEffect(() => {
    return () => {
      onDeviceDisconnectedSubscription && onDeviceDisconnectedSubscription.remove();
      moniterCharacteristic && moniterCharacteristic.remove();
    };
  }, []);

  const showToast = (message, color) => {
    try {
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
    } catch (error) {
      console.error('Error showing toast:', error);
    }
  };

  const scanConnect = async (deviceName) => {
    if (isConnected) {
      return;
    }

    try {
      const init = await BLEService.initializeBLE();
      if (!init) {
        showToast('Bluetooth is not enabled.', Colors.red);
        return;
      }
      const granted = await BLEService.requestBluetoothPermission();
      if (!granted) {
        showToast('Bluetooth permission is required.', Colors.red);
        return;
      }

      const device = await BLEService.scanDevices(deviceName, null, true);
      if (!device) {
        showToast('Device not found.', Colors.red);
        return;
      }
      const connectedDevice = await BLEService.connectToDevice(device).then((device) => {
        return device.discoverAllServicesAndCharacteristics();
      });
      if (!connectedDevice) {
        showToast('Connection failed.', Colors.red);
        return;
      }
      setIsConnected(true);
      setDevice(connectedDevice);
      const mtuRequest = await BLEService.requestMTUForDevice(connectOptions.requestMTU);
      if (!mtuRequest) {
        showToast('MTU negotiation failed.', Colors.red);
        return;
      }
      await setupNotification(connectedDevice);
      setupDisconnectListener(); // Setup listener for disconnection
      showToast('Device connected successfully.', Colors.success);
    } catch (error) {
      console.error('Error scanning device11:', error);
      showToast(`Error scanning device: ${error}`, Colors.red);
    }
  };

  const setupNotification = (device) => {
    if (!device) {
      showToast('Device is not connected.', Colors.red);
      return;
    }
    try {
      moniterCharacteristic = device.monitorCharacteristicForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.error('Error monitoring characteristic:', error);
            showToast(`Error monitoring characteristic: ${error}`, Colors.red);
            moniterCharacteristic.remove();
            return;
          }

          const decodedData = Buffer.from(characteristic.value, 'base64').toString('utf-8');
          const data = JSON.parse(decodedData);
          if ('totalView' in data) {
            setTotalView(data.totalView);
          } else if ('availability' in data) {
            sendAvailability();
          } else {
            setTotalView(true);
            setReceivedData(data);
          }
        }
      );
    } catch (error) {
      moniterCharacteristic.remove();
      console.error('Error setting up notification:', error);
      showToast(`Error setting up notification: ${error}`, Colors.red);
    }
  };

  const setupDisconnectListener = () => {
    // console.log('setupDisconnectListener device', device);
    // if (!device) {
    //   console.error('Device not ready');
    //   showToast('Device not ready', Colors.red);
    //   return;
    // }
    BLEService.onDeviceDisconnectedCustom(device, disconnectedListener);
  };
  const disconnectedListener = (error, device) => {
    if (error) {
      console.error('onDeviceDisconnected');
      console.error(JSON.stringify(error, null, 4));
      showToast('onDeviceDisconnected', Colors.red);
    }
    if (device) {
      console.info(JSON.stringify(device, null, 4));
    }
  };

  const sendStoreId = async (storeId) => {
    try {
      const jsonString = JSON.stringify({ storeId });
      const base64Data = Buffer.from(jsonString).toString('base64');
      await BLEService.writeCharacteristicWithResponseForService(SERVICE_UUID, CHARACTERISTIC_UUID, base64Data);
    } catch (error) {
      console.error(`Send storeId error: ${error.message}`);
    }
  };

  const sendAvailability = async () => {
    try {
      const data = BLEService.getData();
      const staff = data.map((item) => {
        return { id: item.id, startTime: item.startTime };
      });
      console.log('sendAvailability staff', staff);
      sendData({ availability: staff });
    } catch (error) {
      console.error(`Send availability error: ${error.message}`);
    }
  };
  const sendData = async (data) => {
    try {
      if (!isConnected) {
        scanConnect(deviceName);
      }
      const jsonString = JSON.stringify(data);
      const bytes = new TextEncoder().encode(jsonString);
      const mtuSize = 517;
      const chunkSize = mtuSize - 3; // Subtract 3 bytes for the ATT protocol header
      const chunks = [];
      for (let i = 0; i < bytes.length; i += chunkSize) {
        chunks.push(bytes.slice(i, i + chunkSize));
      }
      console.log('sendData chunks');
      for (const chunk of chunks) {
        await BLEService.writeCharacteristicWithoutResponseForService(
          SERVICE_UUID,
          CHARACTERISTIC_UUID,
          Buffer.from(chunk).toString('base64')
        );
      }
      // Send an end-of-data flag
      const endFlag = new TextEncoder().encode('END_OF_DATA');
      await BLEService.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        Buffer.from(endFlag).toString('base64')
      );
      return true;
    } catch (error) {
      showToast(error.message, Colors.red);
      console.error(`Send error: ${error.message}`);
    }
  };

  const disconnectFromDevice = async (id) => {
    try {
      const result = await BLEService.disconnectDeviceById(id);
      if (result) {
        setIsConnected(false);
        setTotalView(false);
        setDevice(null);
        showToast('Device disconnected successfully.', Colors.success);
      } else {
        showToast('Error disconnecting device.', Colors.red);
      }
    } catch (error) {
      console.error('Error disconnecting device:', error);
      showToast(`Error disconnecting device: ${error}`, Colors.red);
    }
  };

  const getToken = async () => {
    const options = {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({
        key: 'WPd4NnbzHiXYW8I1u9uDTZ3vV88v-ei5O2m26mr1',
        merchant_id: '714D3386-A9C9-3BF8-8DE9-C98AD5623331',
      }),
    };
    const url = `https://api.sandbox-paidyet.com/v3/`;
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      key: 'WPd4NnbzHiXYW8I1u9uDTZ3vV88v-ei5O2m26mr1',
      merchant_id: '714D3386-A9C9-3BF8-8DE9-C98AD5623331',
    });
    try {
      const res = await axios.post(`${url}login`, body, {
        headers: headers,
      });
      const token = res.data.result.token;
      console.log('token', token);
      //return res.data.result.token;
      if (token) {
        const temp = await sendInfo(token);
        console.log('temp', temp);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const sendInfo = async (token) => {
    const url = `https://api.sandbox-paidyet.com/v3/`;
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    };
    const body = JSON.stringify({ type: 'sale', amount: 1 });
    try {
      const res = await axios.post('https://api.sandbox-paidyet.com/v3/device/1760025430/transaction', body, {
        headers: headers,
      });
      console.log('res', res);
    } catch (error) {
      console.log('error', error.message);
      console.log('error', error);
    }
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
    receivedData,
    sendData,
    disconnectFromDevice,
    totalView,
    scanConnect,
    device,
    notificationNumber,
    setNotificationNumber,
    getToken,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
export default AdminContextProvider;
export const useAdminContext = () => useContext(AdminContext);
